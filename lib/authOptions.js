import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import dbConnect from "./dbConnect";
import UserModel from "../model/User";
import { env } from "./env";
import Discord from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "demo@demo.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.email },
            ],
          });

          if (!user) {
            console.error("User not found");
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (isPasswordCorrect) {
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username,
              twoFactorActivated: user.twoFactorActivated,
            };
          } else {
            console.error("Incorrect password");
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, OAuthProfile }) {
      if (account?.provider === "google" && profile) {
        const { email, sub } = profile;
        console.log("profileDeatils", profile);
        try {
          await dbConnect();

          let existingUser = await UserModel.findOne({
            $or: [{ email: email }, { googleId: sub }],
          });

          if (existingUser) {
            return existingUser;
          }
          const user = new UserModel({
            email,
            password: null,
            username: profile.name,
            name: profile.given_name,
            image: profile.picture,
            googleId: sub,
            twoFactorActivated: true,
            createdAt: Date.now(),
            eventsRegistered: [],
          });
          await user.save();
          return user;
        } catch (error) {
          console.error(`Error signing in with ${account.provider}:`, error);
          return false;
        }
      }

      if (account.provider === "discord" && profile) {
        const { email, id } = profile;
        try {
          await dbConnect();

          let existingUser = await UserModel.findOne({
            $or: [{ email: email }, { discordId: id }],
          });

          if (existingUser) {
            console.log("User already exists with a different provider");
            return true;
          }
          console.log("existing User", existingUser);
          console.log("profile details", profile);
          const user = new UserModel({
            email,
            username: profile.username,
            name: profile.global_name,
            password: null,
            discordId: id,
            image: profile.image_url,
            twoFactorActivated: true,
            createdAt: Date.now(),
          });

          await user.save();

          return user;
        } catch (error) {
          console.error(`Error signing in with ${account.provider}:`, error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id || user._id?.toString();
        token.twoFactorActivated = user.twoFactorActivated;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.twoFactorActivated = token.twoFactorActivated;
        session.user.username = token.username;
      }
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await UserModel.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  secret: env.NEXTAUTH_SECRET,
};
