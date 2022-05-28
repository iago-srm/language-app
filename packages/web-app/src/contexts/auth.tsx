import React, { useEffect, useContext, useState } from "react";
import {
  GetUserAPIResponse
} from '@language-app/common';
import { useSession, signOut, signIn } from "next-auth/react";

import { LocalStorage } from "@utils";
import { useLoginAPI, LoginApi, useUser } from '@api';

// type AuthContextType = {
//   isAuthenticated: boolean;
//   user: GetUserAPIResponse;
//   login: LoginApi;
//   logout: () => Promise<void>;
//   loginLoading: boolean;
//   loginError: any
// }

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: undefined,
  googleSignIn: () => new Promise<any>(r => r({})),
  credentialsSignIn: (args) => new Promise<any>(r => r({})),
  loginLoading: false,
  loginError: { message: ""},
  logout: () => new Promise<void>(r => r())
})

export function AuthProvider({ children }) {

  const { data: session } = useSession();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GetUserAPIResponse>();
  const [token, setToken] = React.useState(null);

  useEffect(() => {
    const tokenLS = new LocalStorage().getRefreshToken();
    setToken(tokenLS);
  }, []);

  // if (status === 'loading') {
  //   return <div>Loading...</div>
  // }

  const {
    apiCall: login,
    loading: loginLoading,
    error: loginError
   } = useLoginAPI();

  // const {
  //   user,
  //   loadingUser,
  //   errorUser
  //  } = useUser(token);

  useEffect(() => {
    if(session) setUser(session.user);
  }, [session]);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      googleSignIn: () => signIn("google", { callbackUrl: '/'}),
      credentialsSignIn: ({ email, password }) => signIn("google", { callbackUrl: '/', email, password}),
      loginLoading,
      loginError,
      logout: () => signOut({ callbackUrl: '/'})
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
