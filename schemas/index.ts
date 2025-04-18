import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EditApprovedUserSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  metamask: z.string().min(1, { message: "Metamask address required" }),
  autotrade: z.string().min(1, { message: "Autotrade info required" }),
  email: z.string().email({ message: "Invalid email" }),
  approved: z.boolean(),
  whitelisted: z.boolean(),
  groupId: z.string(),

  allowedTradingAmountFrom: z
    .preprocess(
      (val) => {
        // If val is empty, null, or undefined, return 0.
        if (val === undefined || val === null || val === "") return 0;
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      },
      z.number().min(0, { message: "Minimum must be 0 or more" })
    )
    .default(0), // ensure it's always present as a number

  allowedTradingAmountTo: z
    .preprocess((val) => {
      // If the value is "unlimited" (case-insensitive) return the literal
      if (typeof val === "string" && val.trim().toLowerCase() === "unlimited") {
        return "Unlimited";
      }
      if (val === undefined || val === null || val === "") return 0;
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    }, z.union([
      z.number().min(0, { message: "Maximum must be 0 or more" }),
      z.literal("Unlimited")
    ]))
    .default(0),

  adminFee: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === "") return 0;
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      },
      z.number().min(0, { message: "Admin fee must be 0 or more" })
    )
    .default(0),

  userProfit: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === "") return 0;
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      },
      z.number().min(0, { message: "User profit must be 0 or more" })
    )
    .default(0),

  introducerFee: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === "") return 0;
        const num = Number(val);
        return isNaN(num) ? 0 : num;
      },
      z.number().min(0, { message: "Introducer fee must be 0 or more" })
    )
    .default(0),
});
// Schema for the admin popup approval form

export const ApproveUserPopupSchema = z.object({
  groupId: z.string().min(1, "Group is required"),
  whitelisted: z.boolean(),
  allowedTradingAmountFrom: z.number().nonnegative(),
  allowedTradingAmountTo: z.union([z.number().nonnegative(), z.literal("Unlimited")]),
  adminFee: z.number().nonnegative(),
  userProfit: z.number().nonnegative(),
  introducerFee: z.number().nonnegative(),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
   message: "Minumum of 6 characters required"}),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required"}),
});

export const LoginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    // Prevent the user from entering a string that looks like an email
    .refine(
      (val) => !emailRegex.test(val),
      "Invalid username (please do not use an email address)"
    ),
  password: z.string().nonempty("Password is required"),
});


export const RegisterSchema = z
  .object({
    username: z.string().min(3, { message: "Username is required" }),
    firstname: z.string().min(1, { message: "Firstname is required" }),
    lastname: z.string().min(1, { message: "Lastname is required" }),
    phone: z.string().refine(isValidPhoneNumber, { message: "Phone not valid" }),
    country: z.string().min(1, { message: "Country is required" }),
    metamask: z.string().min(1, { message: "Metamask address required" }),
    autotrade: z.string().min(1, { message: "AutoTrade name required" }),
    email: z.string().email({ message: "Valid email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    confirmPassword: z.string().min(6, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

