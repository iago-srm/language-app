import React, { useEffect, useContext, useState } from "react";
import useSWR, { useSWRConfig } from 'swr';

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
    setHeader('authorization', `Bearer ${token}`);
    mutate('user');
  }, [authPostFetcher]);

  const signOut = React.useCallback(async () => {
    if(session) nextAuthSignOut({ callbackUrl: '/'});
    else {
      await authPostFetcher('signout', {});
      setHeader('authorization',"");
      localStorage.setRefreshToken("");
      mutate('user');
    }
  }, [session, authPostFetcher]);

  const {
    data: credentialsUser,
    loading: credentialsUserLoading
  } = useApiCallSWR<IGetUserAPIResponse>('user',authGetFetcher);
  console.log({credentialsUser});

  useEffect(() => {
    if(session) setSocialSignInUser(session.user);
  }, [session]);

  useEffect(() => {
    setIsAuthenticated(!!socialSignInUser || !!credentialsUser);
  }, [socialSignInUser, credentialsUser]);

  useEffect(() => {
    const tokenLS = localStorage.getRefreshToken();
    if(tokenLS) {
      setHeader('authorization',`Bearer ${tokenLS}`);
      mutate('user');
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user: socialSignInUser || credentialsUser,
      isAuthenticated,
      isUserLoading: socialUserStatus === 'loading' || credentialsUserLoading,
      googleSignIn: () => signIn("google", { callbackUrl: '/dashboard'}),
      credentialsSignIn,
      credentialsSignUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
