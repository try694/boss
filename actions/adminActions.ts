"use server";

import * as z from "zod";
import { ApproveUserPopupSchema } from "@/schemas"; // Centralized schema for admin approval inputs
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { revalidatePath } from "next/cache";

export const approveUserWithData = async (
  userId: string,
  values: z.infer<typeof ApproveUserPopupSchema>
) => {
  // Validate incoming values using the centralized schema.
  const validatedFields = ApproveUserPopupSchema.safeParse(values);
  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((err) => err.message)
      .join(", ");
    return { error: errorMessages || "Invalid fields!" };
  }

  // Destructure the validated data.
  const {
    groupId,
    whitelisted,
    allowedTradingAmountFrom,
    allowedTradingAmountTo,
    adminFee,
    userProfit,
    introducerFee,
  } = validatedFields.data;

  // Check if the user exists.
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User not found" };
  }

  try {
    // Convert the "Unlimited" string to null to satisfy the Prisma Float field.
    const allowedTradingAmountToValue =
      allowedTradingAmountTo === "Unlimited" ? null : allowedTradingAmountTo;
      
    // Update the user's record with the admin-provided data and mark as approved.
    await db.user.update({
      where: { id: userId },
      data: {
        approved: true,
        groupId,
        whitelisted,
        allowedTradingAmountFrom,
        allowedTradingAmountTo: allowedTradingAmountToValue,
        adminFee,
        userProfit,
        introducerFee,
      },
    });
    // Revalidate the waiting list route (adjust the path as needed)
    revalidatePath("/waitinglist");
    return { success: "User approved successfully!" };
  } catch (error) {
    console.error("Error approving user:", error);
    return { error: "Error approving user" };
  }
};


export const deleteUserById = async (userId: string) => {
  try {
    await db.user.delete({ where: { id: userId } });
    // Revalidate the approved users route (adjust the path as needed)
    revalidatePath("/approveduser");
    return { success: "User deleted successfully!" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Error deleting user" };
  }
};