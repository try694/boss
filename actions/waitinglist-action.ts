"use server";

import * as z from "zod";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { EditApprovedUserSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { currentRole } from "@/lib/auth";

export const deleteUserById = async (userId: string) => {
  // Ensure only admin users can perform this action.
  const role = await currentRole();
  if (role !== "ADMIN") {
    return { error: "Unauthorized: Admin access required." };
  }

  try {
    await db.user.delete({
      where: { id: userId },
    });
    // Optionally revalidate a related path after deletion.
    revalidatePath("/approveduser");
    return { success: "User rejected and removed successfully!" };
  } catch (error) {
    console.error("Error rejecting user:", error);
    return { error: "Failed to reject user. Please try again." };
  }
};

export const getAllUsers = async () => {
  // Restrict this action to admin users.
  const role = await currentRole();
  if (role !== "ADMIN") {
    return { error: "Unauthorized: Admin access required." };
  }

  try {
    const users = await db.user.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getApprovedUsers = async () => {
  // Restrict this action to admin users.
  const role = await currentRole();
  if (role !== "ADMIN") {
    return { error: "Unauthorized: Admin access required." };
  }

  try {
    const users = await db.user.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    // Normalize whitelisted field.
    return users.map(user => ({
      ...user,
      whitelisted: user.whitelisted ?? false,
    }));
  } catch (error) {
    console.error("Error fetching approved users:", error);
    return [];
  }
};

export const updateApprovedUser = async (
  userId: string,
  values: z.infer<typeof EditApprovedUserSchema>
) => {
  // Ensure only admin users can perform this action.
  const role = await currentRole();
  if (role !== "ADMIN") {
    return { error: "Unauthorized: Admin access required." };
  }

  // Validate incoming values using the centralized schema.
  const parsed = EditApprovedUserSchema.safeParse(values);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors.map(err => err.message).join(", ");
    return { error: errorMessages || "Invalid fields!" };
  }

  const {
    firstname,
    lastname,
    phone,
    country,
    metamask,
    autotrade,
    email,
    approved,
    whitelisted,
    groupId,
    allowedTradingAmountFrom,
    allowedTradingAmountTo,
    adminFee,
    userProfit,
    introducerFee,
  } = parsed.data;

  // Ensure the target user exists.
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User not found" };
  }

  try {
    // Convert allowedTradingAmountTo: if "Unlimited", then set to null.
    const allowedTradingAmountToValue: number | null =
      allowedTradingAmountTo === "Unlimited" ? null : Number(allowedTradingAmountTo);

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        phone,
        country,
        metamask,
        autotrade,
        email,
        approved,
        whitelisted,
        groupId,
        allowedTradingAmountFrom,
        allowedTradingAmountTo: allowedTradingAmountToValue,
        adminFee,
        userProfit,
        introducerFee,
      },
    });
    // Revalidate the approved user page (adjust the path as needed).
    revalidatePath("/approveduser");
    return { success: "User updated successfully!", user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error updating user" };
  }
};
