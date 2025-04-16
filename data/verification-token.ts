// verificationToken.ts

import { db } from "@/lib/db";

/**
 * Retrieves a verification token by email.
 *
 * @param email - The email to look up.
 * @returns The matching verification token or null if none is found.
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves a verification token by token string.
 *
 * @param token - The token string to look up.
 * @returns The matching verification token or null if none is found.
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { token },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
