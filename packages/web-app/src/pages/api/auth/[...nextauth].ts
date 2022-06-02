import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUseCase, signupUseCase, getUserUseCase } from '@api';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@email.com" },
        password: {  label: "Password", type: "password" },
        confirmPassword: {  label: "Confirm Password", type: "password" },
        role: {  label: "Eu sou", type: "text" },
        name: {  label: "Name", type: "text" },
      },
      async authorize(credentials, req) {
        let resp;
        console.log({credentials})
        const { email, password, confirmPassword, role, name } = credentials;
        try {
          if(!confirmPassword) {
            resp = await loginUseCase({ email, password });
            console.log('login credentials response',{resp})
          }
          else {
            resp = await signupUseCase({ name, email, password, confirmPassword, role });
            console.log('signup credentials response',{resp})
          }
        } catch(e) {
          console.log('caught',{e})
          throw e;
        }
        return {
          ...resp
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log('session params',{ session, token, user });
      if(token.provider === 'credentials') {
        console.log('getting user bc credentials')
        // const resp = await getUserUseCase();
        // console.log({resp});
      }
      return session;
    },
    // async signIn(signInParams) {
    //   console.log({ signInParams })
    //   return true;
    // },
    async jwt(jwtParams) {
      console.log({ jwtParams })
      //{ token, user, account, profile, isNewUser }
      if(jwtParams.account) return {
        ...jwtParams.token,
        provider: jwtParams.account?.provider
      }
      return jwtParams.token;
    },
  },
  // session: {
  //   jwt: true,
  //   maxAge: 24 * 60 * 60, // 24 hours
  // },

})
