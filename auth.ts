// // app/auth.ts or wherever you place your auth logic
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user }) {
      // Ensure user.id is defined
      if (!user.id) return false;
      
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;
       
      return true;
    },
    async session({ token, session }) {
      // If token has a subject and session user exists, assign the id
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }
      // If token has a role and session user exists, assign the role
      if (token.role && session.user) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      // Cast token.sub as string since getUserById expects a string
      const existingUser = await getUserById(token.sub as string);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
