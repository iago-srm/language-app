import React, { useEffect, useContext } from "react";
import {
  GetUserAPIResponse
} from '@language-app/common';

import { LocalStorage } from "@utils";
import { useLoginAPI, LoginApi, useUser } from '@api';
import { LanguageContext } from '@contexts';

type AuthContextType = {
  isAuthenticated: boolean;
  user: GetUserAPIResponse;
  login: LoginApi;
  loginLoading: boolean;
  loginError: any
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
  user: undefined,
  login: () => new Promise(r => r({
    token: ""
  })),
  loginLoading: false,
  loginError: ""
})

export function AuthProvider({ children }) {

  const [token, setToken] = React.useState(null);
  // const { language } = useContext(LanguageContext);

  useEffect(() => {
    const tokenLS = new LocalStorage().getRefreshToken();
    setToken(tokenLS);
  }, []);

  const {
    apiCall: login,
    loading: loginLoading,
    error: loginError
   } = useLoginAPI();

  const {
    user,
    loadingUser,
    errorUser
   } = useUser(token);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      loginLoading,
      loginError
    }}>
      {children}
    </AuthContext.Provider>
  )
}
