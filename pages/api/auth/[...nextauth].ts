import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Auth0Provider from "next-auth/providers/auth0";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the Log In form (e.g. "Log In with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the Log In page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const { email, password } = credentials;
        const { submitName, secretkey } = req.query;

        let user = null;
        if (!submitName) {
          user = await prisma.user.findFirst({
            where: {
              email: email,
            },
            include: {
              Profile: true,
            },
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );
          if (!passwordMatch) {
            return null;
          }
        } else {
          if (!["registerUser", "registerAdmin"].includes(submitName)) {
            return null;
          }

          if (
            submitName == "registerAdmin" &&
            secretkey !== "onlyAdminCanRegisterILS"
          ) {
            return null;
          }

          // check if user exists
          user = await prisma.user.count({
            where: {
              email: email,
            },
          });

          if (user > 0) {
            throw new Error("User already exists");
          }

          if (password.length < 8) {
            throw new Error("Password must be at least 8 characters");
          }

          // Create new User
          const hashedPassword = await bcrypt.hash(password, 10);
          user = await prisma.user.create({
            data: {
              email,
              passwordHash: hashedPassword,
            },
          });

          // Create new Profile
          const profile = await prisma.profile.create({
            data: {
              id: user.id,
              userId: user.id,
              role: submitName === "registerAdmin" ? "ADMIN" : "USER",
            },
          });

          user.Profile = profile;
        }

        // console.log(user);

        return user;
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log(token, account);
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.role = user.Profile["role"];
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log(session, token);
      if (token) {
        session.accessToken = token.accessToken;
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      url = !!url ? url : "/";
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
