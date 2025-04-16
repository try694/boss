// verificationToken.ts

import { db } from "@/lib/db";

/**
 * Retrieves a verification token by email.
 *
 * @param email - The email to look up.
 * @returns The matching verification token or null if none is found.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const PasswordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return PasswordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const PasswordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return PasswordResetToken;
  } catch {
    return null;
  }
};