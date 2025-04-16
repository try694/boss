// next-auth.d.ts
import { DefaultSession } from "next-auth";

/**
 * Extend the default Session user type to include a `role` property.
 */
export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
