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
import { IGetUserAPIResponse } from "@language-app/common-core";

interface IAuthContext {
  isAuthenticated?: number;
  user?: any;
  isUserLoading?: boolean;
  userError?: any;
  refreshUser?: () => void;
  googleSignIn?: () => Promise<any>;
  credentialsSignIn?: { signIn: ({email, password}) => Promise<{error?: string}>, loading: boolean };
  credentialsSignUp?: SignUp;
  signOut?: () => void;
  updateUser?: () => void;
  tokenHeaderSet: boolean;
}

export const handleAuthToken = (token: string) => {
  setCommonHeaders('authorization', `Bearer ${token}`);
  if(token) localStorage.setRefreshToken(token);
  else localStorage.deleteRefreshToken();
  setCookie(undefined, 'language-app.token', token, {
    maxAge: 60 * 60 * 1, // 1 hour
  })
}

const AuthContext = React.createContext<IAuthContext>({
  tokenHeaderSet: false
})

const localStorage = new LocalStorage();

export function AuthProvider({ children }) {

  const { data: session } = useSession();
  const {
    signUp: credentialsSignUp,
    signIn,
    signOut: credentialsSignOut,
    useUser
  } = useApiBuilder();

  const [isAuthenticated, setIsAuthenticated] = useState(0);
  const { mutate } = useSWRConfig();
  const [tokenHeaderSet, setTokenHeaderSet] = React.useState(false);

  const refreshUser = () => {
    mutate('user');
  }

  const googleSignIn = React.useCallback(async () => {
    await nextAuthSignIn("google", { callbackUrl: '/' });
    setTokenHeaderSet(true);
  }, [])

  const credentialsSignIn = async ({ email, password }) => {
    const { error } = await signIn.apiCall({ email, password });
    if(!error) {
      setTokenHeaderSet(true);
      return {
        error: undefined
      };
      // router.push('/dashboard');
    }
    return {
      error: error.message || "Algo deu errado",
    }
  }
  const signOut = React.useCallback(async () => {
    if(session) nextAuthSignOut({ redirect: false });
    await credentialsSignOut.apiCall();
    handleAuthToken("");
    setTokenHeaderSet(false);
    setIsAuthenticated(-1);
  }, [session]);

  useEffect(() => {
    if(session) {
      handleAuthToken((session.token as { auth_token: string}).auth_token);
      setTokenHeaderSet(true)
    }
  }, [session]);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(token) {
      setTokenHeaderSet(true);
      handleAuthToken(token);
    } else {
      setIsAuthenticated(-1);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [tokenHeaderSet]);

  // const updateUser = () => {
  //   setUser({...user});
  // }

  const {
    data: user,
    loading: userLoading,
    error: userError
  } = useUser(tokenHeaderSet);

  // const [user, setUser] = useState<IGetUserAPIResponse>();
  // useEffect(() => {
  //   setUser(data);
  // }, [data]);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(userError && token) {
      // console.log({userError,token});
    }
  },[userError]);

  // useEffect(() => {
  //   if(user) setIsAuthenticated(1);
  // }, [user]);

  return (
    <AuthContext.Provider value={{
      user: {
        id: '7eb14bc7-26cb-468e-86c0-fad7c8af0619',
        tokenVersion: 0,
        role: 'STUDENT',
        cefr: "A2"
      }, // for debugging purposes
      isAuthenticated,
      isUserLoading: userLoading || (!userLoading && !user && !userError),
      userError,
      refreshUser,
      googleSignIn,
      credentialsSignIn: {
        signIn: credentialsSignIn,
        loading: signIn.loading
      },
      credentialsSignUp,
      signOut,
      // updateUser
      tokenHeaderSet
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
