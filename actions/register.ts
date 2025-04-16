"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    username,
    firstname,
    lastname,
    phone,
    country,
    metamask,
    autotrade,
    email,
    password,
  } = validatedFields.data;

  const normalizedUsername = username.trim().toLowerCase();
  const normalizedEmail = email.trim().toLowerCase();

  // Check for existing username
  const existingUsername = await getUserByUsername(normalizedUsername);
  if (existingUsername) {
    return { error: "Username already taken!" };
  }

  // Check for existing email
  const existingUser = await getUserByEmail(normalizedEmail);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  await db.user.create({
    data: {
      username: normalizedUsername,
      firstname,
      lastname,
      phone,
      country,
      metamask,
      autotrade,
      email: normalizedEmail,
      password: hashedPassword,
      approved: false,
      whitelisted: false,
      groupId: "",
      allowedTradingAmountFrom: 0,
      allowedTradingAmountTo: 0,
      adminFee: 0,
      userProfit: 0,
      introducerFee: 0,
    },
  });

  // Send email verification
  const verificationToken = await generateVerificationToken(normalizedEmail);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent Check your inbox to verify your email and login!" };
};
