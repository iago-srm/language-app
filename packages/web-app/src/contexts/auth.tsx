import React, { useEffect, useContext, useState } from "react";
import { useSWRConfig } from 'swr';
import { setCookie, parseCookies } from 'nookies';
import { getToken } from "next-auth/jwt";

import {
  ISignInAPIParams,
  ISignUpAPIParams,
  IGetUserAPIResponse,
  SignInHTTPDefinition,
  SignOutHTTPDefinition,
  SignUpHTTPDefinition
} from '@language-app/common';
import {
  useSession,
  signOut as nextAuthSignOut,
  signIn,
} from "next-auth/react";
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
    authPatchFetcher,
    setHeader
  } = useApi();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate } = useSWRConfig();

  const handleAuthToken = (token: string) => {
    setHeader('authorization', `Bearer ${token}`);
    localStorage.setRefreshToken(token);
  }

  const credentialsSignUp = React.useCallback(async ({name, email, password, confirmPassword, role }) => {
    try {
      await authPostFetcher(SignUpHTTPDefinition.path, {
        name,
        email,
        password,
        confirmPassword,
      });
    } catch (e) {
      return {error: e.message};
    }
  }, [authPostFetcher]);

  const credentialsSignIn = React.useCallback(async ({ email, password }) => {
    const {
      token
    } = await authPostFetcher(SignInHTTPDefinition.path, {
      email,
      password
    });
    handleAuthToken(token);
    mutate('user');
  }, [authPostFetcher]);

  const googleSignIn = React.useCallback(async () => {
    await signIn("google", { callbackUrl: '/dashboard' });
  }, [])

  const signOut = React.useCallback(async () => {
    if(session) nextAuthSignOut({ redirect: false });
    await authPatchFetcher(SignOutHTTPDefinition.path, {});
    handleAuthToken("");
    localStorage.setRefreshToken("");
    mutate('user');
  }, [session, authPostFetcher]);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(token) {
      handleAuthToken(token);
      mutate('user');
    }
  }, []);

  const {
    data: user,
    loading: userLoading
  } = useApiCallSWR<IGetUserAPIResponse>('user',authGetFetcher);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(session) {
      // does not work?
      mutate('user');
    }
    if(session && !token) {
      handleAuthToken((session.token as { auth_token: string}).auth_token);
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
