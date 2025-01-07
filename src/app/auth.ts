import { signInSchema } from "@/lib/zodSchema";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    github,
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
        let user = null;

        // const { email, password } = await signInSchema.parseAsync(credentials);
        const parsedCredentials = signInSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.error("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }
        user = {
          id: "1",
          name: "Aditya Singh",
          email: "jojo@jojo.com",
          role: "admin",
        };
        if (!user) {
          // throw new Error("Invalid credentials.");
          console.log("Invalid User");
          return null;
        }
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;
      if (pathname.startsWith("/auth/signin") && isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return !!auth;
    },
    // jwt({ token, user, trigger, session }) {
    //   if (user) {
    //     token.id = user.id as string;
    //     token.role = user.role as string;
    //   }
    //   if (trigger === "update" && session) {
    //     token = { ...token, ...session };
    //   }
    //   return token;
    // },
    // session({ session, token }) {
    //   session.user.id = token.id;
    //   session.user.role = token.role;
    //   return session;
    // },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
