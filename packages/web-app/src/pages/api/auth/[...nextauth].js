import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signupUseCase } from '@api';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // CredentialsProvider({
    //   async authorize(credentials, req) {
    //     console.log({credentials, req});
    //     // await signupUseCase({})
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   }
    // })
  ],
  callbacks: {
    async session({ session, token, user }) {
      // console.log('session',{session, token, user})
      // session.user = token?.token?.token?.token?.user;
      return session;
    },
    async signIn(signInParams) {
      console.log({ signInParams })
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log('jwt',{ token, user, account, profile, isNewUser })
      return token
    }
  },
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },

})
