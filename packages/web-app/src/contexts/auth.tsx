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
  isAuthenticated?: number;
  user?: any;
  isUserLoading?: boolean;
  userError?: any;
  refreshUser?: () => void;
  googleSignIn?: () => Promise<any>;
  credentialsSignIn?: { signIn: ({email, password}) => Promise<{error?: string}>, loading: boolean };
  credentialsSignUp?: SignUp;
  signOut?: () => void;
}

export const handleAuthToken = (token: string) => {
  setCommonHeaders('authorization', `Bearer ${token}`);
  if(token) localStorage.setRefreshToken(token);
  else localStorage.deleteRefreshToken();
  setCookie(undefined, 'language-app.token', token, {
    maxAge: 60 * 60 * 1, // 1 hour
  })
}

const AuthContext = React.createContext<IAuthContext>({})

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
    // user.image = `${Date.now()}-${user.image}`;
    // user.getImage =
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
      error: error.message,
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

  const {
    data: user,
    loading: userLoading,
    error: userError
  } = useUser(tokenHeaderSet);

  useEffect(() => {
    const token = localStorage.getRefreshToken();
    if(userError && token) {
      console.log({userError,token});
    }
  },[userError]);

  useEffect(() => {
    if(user) setIsAuthenticated(1);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
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
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
