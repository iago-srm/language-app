import React, { useEffect, useContext, useState } from "react";
import {
  IGetUserAPIResponse
} from '@language-app/common';
import { useSession, signOut as nextAuthSignOut, signIn } from "next-auth/react";
import { useApi } from './api';
import { LocalStorage } from "@utils";
// import { LoginApi, useUser } from '@api';

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
  // loginLoading: false,
  // loginError: { message: ""},
  signOut: () => new Promise<void>(r => r())
})

const localStorage = new LocalStorage();

export function AuthProvider({ children }) {

  const { data: session } = useSession();
  const {
    signInUseCase,
    signUpUseCase,
    getUserUseCase,
    signOutUseCase,
    setToken
  } = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Partial<IGetUserAPIResponse>>();

  const credentialsSignIn = React.useCallback(async ({ email, password }) => {
    const {
      user
    } = await signInUseCase({email, password});
    console.log({user})
    setUser(user);
    // setToken(token);
  }, [signInUseCase]);


  const signOut = () => {
    if(session) nextAuthSignOut({ callbackUrl: '/'});
    else return signOutUseCase()
  }

  console.log({session, user})

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
      googleSignIn: () => signIn("google", { callbackUrl: '/dashboard'}),
      credentialsSignIn,
      // loginLoading,
      // loginError,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
