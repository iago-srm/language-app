import React, { useEffect, useContext, useState } from "react";
import { useSWRConfig } from 'swr';
import {
  useSession,
  signOut as nextAuthSignOut,
  signIn as nextAuthSignIn,
} from "next-auth/react";
import {
  setCommonHeaders,
  useApiBuilder,
  SignIn,
  SignUp,
  SignOut,
} from '@services/api';
import { LocalStorage } from "@services/browser";
import { setCookie, parseCookies } from 'nookies'

interface IAuthContext {
  isAuthenticated?: boolean;
  user?: any;
  isUserLoading?: boolean;
  googleSignIn?: () => Promise<any>;
  credentialsSignIn?: SignIn;
  credentialsSignUp?: SignUp;
  signOut?: () => void;
}

export const handleAuthToken = (token: string) => {
  setCommonHeaders('authorization', `Bearer ${token}`);
  localStorage.setRefreshToken(token);
  setCookie(undefined, 'language-app.token', token, {
    maxAge: 60 * 60 * 1, // 1 hour
  })
}

const AuthContext = React.createContext<IAuthContext>({})

const localStorage = new LocalStorage();

export function AuthProvider({ children }) {

  const { data: session, status: socialUserStatus } = useSession();
  const {
    signUp: credentialsSignUp,
    signIn: credentialsSignIn,
    signOut: credentialsSignOut,
    useUser
  } = useApiBuilder();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate } = useSWRConfig();

  const googleSignIn = React.useCallback(async () => {
    await nextAuthSignIn("google", { callbackUrl: '/' });
    mutate('user');

  }, [])

  const signOut = React.useCallback(async () => {
    if(session) nextAuthSignOut({ redirect: false });
    await credentialsSignOut.apiCall();
    handleAuthToken("");
    mutate('user');
  }, [session]);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(token) {
      handleAuthToken(token);
      mutate('user');
    }
  }, []);

  const {
    data: user,
    loading: userLoading,
    error: userError
  } = useUser();

  useEffect(() => {
    if(session) {
      handleAuthToken((session.token as { auth_token: string}).auth_token);
      mutate('user');
    }
  }, [session]);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isUserLoading: userLoading,
      googleSignIn,
      credentialsSignIn,
      credentialsSignUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
