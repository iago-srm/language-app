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
      // happens on sign-in of existing and of new users
      console.log("signin")
      try {
        await axios[GoogleSignUpHTTPDefinition.method]
          (`${process.env.NEXT_PUBLIC_AUTH_URL}/${GoogleSignUpHTTPDefinition.path}`,
          { 
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            provider: account.provider 
          });
      } catch(e) {
        console.log("google sign up error",e.response.data)
        return false;
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async jwt({ user, token }) {
      // happens after sign-in and on application mount. Lots of unecessary resingins
      console.log("jwt");
      const email = user?.email || token.email;
        let resp;
        try {
          resp =
            await axios[GoogleSignInHTTPDefinition.method]
            (`${process.env.NEXT_PUBLIC_AUTH_URL}/${GoogleSignInHTTPDefinition.path}`,
            { email });
            // console.log("token from google sign in endpoint:",resp.data.token);
          token.auth_token = resp.data.token;
        } catch(e) {
          console.log("google sign-in error (jwt callback)",e.response.data)
        }
      return token;
    },
    async session({ session, token }) {
      // happens whenever application mounts.
      console.log("session");
      session.token = token;
      return session;
    }
  },
})
