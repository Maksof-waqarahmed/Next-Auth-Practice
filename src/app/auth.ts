import { signInSchema } from "@/lib/zodSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github({
      profile(profile) {
        return {
          id: "some random id is here",
          name: profile.name || "Default Name",
          email: profile.email || "default-email@domain.com",
          role: "user",
        };
      },
    }),
    google,
    Credentials({
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = {
            id: "1",
            name: "Aditya Singh",
            email: "jojo@jojo.com",
            role: "admin",
          };

          if (!user) {
            console.error("Invalid user credentials");
            return null;
          }
          return user;
        } catch (error) {
          console.error("Error during credential parsing or validation", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as string;
      }
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
