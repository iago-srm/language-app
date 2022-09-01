import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { SignInHTTPDefinition } from "@language-app/common-core";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {

    async jwt({ user, token }) {
      if(user) {
        let resp;
        try {
          resp =
            await axios[SignInHTTPDefinition.method]
            (`${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1/${SignInHTTPDefinition.path}`,
            { id: user.id });
          token.auth_token = resp.data.token;
        } catch(e) {
          console.log(e.response.data)
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token;
      return session;
    }
  },
})
