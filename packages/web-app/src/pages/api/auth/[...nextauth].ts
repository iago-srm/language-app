import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUseCase } from '@api';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // console.log({credentials, req});
        try {
          const resp = await loginUseCase({...credentials});
          console.log('login credentials response',{resp})
        } catch(e) {
          console.log(e);
        }
        return {
          name: 'test',
          image: 'test'
        }
      }
    })
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
    },
    // async redirect(redirectParams) {

    // }
  },
  // session: {
  //   jwt: true,
  //   maxAge: 24 * 60 * 60, // 24 hours
  // },

})
