import React, { useEffect } from "react";
import Router from 'next/router'
import { useUser, LocalStorage } from '@helpers';
import {
  LoginAPIParams,
  LoginAPIResponse,
  GetUserAPIResponse
} from '@language-app/common';

// axios.defaults.withCredentials = true;

// type LoginData = {
//   email: string;
//   password: string;
// }

// interface IRefreshTokenResponse { accessToken: string }

type AuthContextType = {
  isAuthenticated: boolean;
  user?: GetUserAPIResponse;
  login?: (data: LoginAPIParams) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextType>({
  isAuthenticated: false,
})

export function AuthProvider({ children }) {

  const {
    user,
    loading: userLoading,
    error: userError
  } = useUser<GetUserAPIResponse>();

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
