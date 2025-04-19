import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

// Example: getUserById implementation using Prisma
// Example getUserById function using Prisma:
export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
      emailVerified: true,  // Ensure this field is selected.
    },
  });
}


export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: { username },
    });
    return user;
  } catch {
    return null;
  }
};

