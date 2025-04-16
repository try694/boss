"use server";
 
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/db";

type LoginResponse = { error?: string; success?: string };

export const login = async (
  values: z.infer<typeof LoginSchema>
): Promise<LoginResponse> => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { username, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { username: username.toLowerCase() },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Username doesn't exist!" };
  }

  // If not verified, resend the link and return a short success message.
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // SHORT GREEN MESSAGE:
    return {
      success: "Email not verified. Check your inbox and verify!",
    };
  }

  try {
    const res = await signIn("credentials", {
      username: username.toLowerCase(),
      password,
      redirect: false,
    });

    if (res?.error) {
      return { error: "Invalid credentials!" };
    }

    return { success: "Login successful!" };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};
