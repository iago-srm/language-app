import NextAuth, { SessionOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, image }, account: { provider }, credentials, email }) {
      console.log({credentials, email})


      return true;
    },
    // async session({ session, user, token }) {
    //   console.log({ session, user, token });
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   console.log({isNewUser});
    //   return token;
    // }
  },

})
