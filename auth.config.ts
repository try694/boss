import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas"; // Your Zod schema or similar for validation
import { getUserByEmail, getUserByUsername } from "@/data/user"; // Custom function to fetch user by email

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        // 1. Validate the incoming credentials
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        // 2. Destructure the validated data
        const { username, password } = validatedFields.data;

        // 3. Fetch the user by email
        const user = await getUserByUsername(username);
        if (!user || !user.password) {
          return null;
        }

        // 4. Compare the plain-text password with the hashed password in the database
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          // Return the user object if authentication succeeds
          return user;
        }

        // If password comparison fails, return null
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

