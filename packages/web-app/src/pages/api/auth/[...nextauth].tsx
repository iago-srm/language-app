import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { GoogleSignInHTTPDefinition, GoogleSignUpHTTPDefinition } from "@language-app/common-core";

export default NextAuth({
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
    async signIn({ user, account, profile, email, credentials }) {
      // happens on sign-in of existing and new users
      console.log("signin")
      try {
        await axios[GoogleSignUpHTTPDefinition.method]
          (`${process.env.NEXT_PUBLIC_AUTH_URL}/${GoogleSignUpHTTPDefinition.path}`,
          { 
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image 
          });
      } catch(e) {
        console.log(e.response.data)
        return false;
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      // console.log({url, baseUrl})
      return baseUrl
    },
    async jwt({ user, token }) {
      if(user) {
        let resp;
        try {
          resp =
            await axios[GoogleSignInHTTPDefinition.method]
            (`${process.env.NEXT_PUBLIC_AUTH_URL}/${GoogleSignInHTTPDefinition.path}`,
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
