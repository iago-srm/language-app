import React from "react";
import { setCookie, parseCookies } from 'nookies';
import axios from 'axios';
import Router from 'next/router'
import { verify } from "jsonwebtoken";
import { User } from '../domain';
import { CookieNames } from "../constants/names.enum";
import { useApiCall } from '../services';
import { login as loginApi, refreshTokens as refreshTokensApi, ApiError } from '../services';

// axios.defaults.withCredentials = true;

type LoginData = {
  email: string;
  password: string;
}

interface IRefreshTokenResponse { accessToken: string }

type AuthContextType = {
  isAuthenticated: boolean;
  user?: User;
  login?: (data: LoginData) => Promise<void>;
  loginErrors?: ApiError;
  refreshErrors?: ApiError;
  loginLoading: boolean;
  loginResponse?: any
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  loginLoading: false
})

export function AuthProvider({ children }) {

  const [user, setUser] = React.useState<User>(undefined);

  const {
    apiCall: loginApiCall,
    errors: loginErrors,
    response: loginResponse,
    loading: loginLoading

  } = useApiCall<LoginData,IRefreshTokenResponse>(loginApi);

  const {
    apiCall: refreshTokensApiCall,
    errors: refreshErrors,
    response: refreshResponse,
    loading: refreshLoading
  } = useApiCall<LoginData,IRefreshTokenResponse>(refreshTokensApi);

  const isAuthenticated = !!user;

  const handleTokensRefreshed = React.useCallback(async (token) => {
    try{
      const payload = verify(token, 'fdsbbeygvneivfbefiwl343426dbed'/*process.env.ACCESS_TOKEN_SECRET*/);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(payload.data);
    } catch(e) {
      console.log(e);
    }
  }, [setUser]);

  React.useEffect(() => {
    if(refreshErrors.status === 403) {
      Router.push('/login');
    }
  }, [refreshErrors]);

  React.useEffect(() => {
    refreshTokensApiCall();
  }, []);

  React.useEffect(() => {
    if(refreshResponse?.data) {
      handleTokensRefreshed(refreshResponse.data);
    }
  }, [refreshResponse]);

  React.useEffect(() => {
    if(loginResponse) {
      handleTokensRefreshed(loginResponse.data);
      Router.push('/dashboard');
    }
  }, [loginResponse]);

  // React.useEffect(() => {
  //   if(response) {
  //     const { accessToken, refreshToken, user } = response.data;

  //     setCookie(undefined, CookieNames.ACCESS_TOKEN, accessToken, {
  //       maxAge: 60 * 60 * 24 * 7, // 1 week
  //     });
  //     setCookie(undefined, CookieNames.REFRESH_TOKEN, refreshToken, {
  //       maxAge: 60 * 60 * 24 * 7, // 1 week
  //     });
  //     setCookie(undefined, CookieNames.USER_ID, user.id, {
  //       maxAge: 60 * 60 * 24 * 7, // 1 week
  //     });
  //     // api.defaults.headers['Authorization'] = `Bearer ${token}`;

  //     setUser(user)

  //     Router.push('/dashboard');
  //   }
  // }, [response]);

  const login = React.useCallback(async ({ email, password }: LoginData) => {
    await loginApiCall({ email, password });
  }, [loginApiCall]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginErrors,
      refreshErrors,
      loginLoading,
      loginResponse
    }}>
      {children}
    </AuthContext.Provider>
  )
}
