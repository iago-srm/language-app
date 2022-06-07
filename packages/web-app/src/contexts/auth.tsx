import React, { useEffect, useContext, useState } from "react";
import { useSWRConfig } from 'swr';
import { setCookie, parseCookies } from 'nookies';

import {
  ISignInAPIParams,
  ISignUpAPIParams,
  IGetUserAPIResponse
} from '@language-app/common';
import { useSession, signOut as nextAuthSignOut, signIn } from "next-auth/react";
import { useApi } from './api';
import { LocalStorage } from "@utils";
import { useApiCallSWR } from "@api";

interface IAuthContext {
  isAuthenticated?: boolean;
  user?: any;
  isUserLoading?: boolean;
  googleSignIn?: () => Promise<any>;
  credentialsSignIn?: (args: ISignInAPIParams) => Promise<any>;
  credentialsSignUp?: (args: ISignUpAPIParams) => Promise<any>;
  signOut?: () => void;
}

const AuthContext = React.createContext<IAuthContext>({})

const localStorage = new LocalStorage();

export function AuthProvider({ children }) {

  const { data: session, status: socialUserStatus } = useSession();
  const {
    authGetFetcher,
    authPostFetcher,
    setHeader
  } = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [socialSignInUser, setSocialSignInUser] = useState<Partial<IGetUserAPIResponse>>();
  const { mutate } = useSWRConfig();

  const handleAuthToken = (token: string) => {
    setHeader('authorization', `Bearer ${token}`);
    localStorage.setRefreshToken(token);
    setCookie(undefined, 'language-app.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    })
  }

  const credentialsSignUp = React.useCallback(({name, email, password, confirmPassword, role }) =>
    authPostFetcher('signup', {
      name,
      email,
      password,
      confirmPassword,
      role
    }), [authPostFetcher]);

  const credentialsSignIn = React.useCallback(async ({ email, password }) => {
    const {
      token
    } = await authPostFetcher('signin', {
      email,
      password
    });
    handleAuthToken(token);
    mutate('user');
  }, [authPostFetcher]);

  const googleSignIn = React.useCallback(() => {
    return signIn("google", { callbackUrl: '/dashboard' });
  }, [])

  const signOut = React.useCallback(async () => {
    if(session) nextAuthSignOut({ redirect: false });
    else {
      await authPostFetcher('signout', {});
      handleAuthToken("");
      localStorage.setRefreshToken("");
      mutate('user');
    }
  }, [session, authPostFetcher]);

  const {
    data: credentialsUser,
    loading: credentialsUserLoading
  } = useApiCallSWR<IGetUserAPIResponse>('user',authGetFetcher);

  useEffect(() => {
    if(session) setSocialSignInUser(session.user);
    else setSocialSignInUser(null);
  }, [session]);

  useEffect(() => {
    setIsAuthenticated(!!socialSignInUser || !!credentialsUser);
  }, [socialSignInUser, credentialsUser]);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(token) {
      handleAuthToken(token);
      mutate('user');
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user: socialSignInUser || credentialsUser,
      isAuthenticated,
      isUserLoading: socialUserStatus === 'loading' || credentialsUserLoading,
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
