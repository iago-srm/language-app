import React, { useEffect, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useLanguage } from './locale';
import {
  ISignInAPIParams,
  ISignUpAPIParams,
  ISignUpAPIResponse,
  ISignInAPIResponse,
  IGetUserAPIResponse,
} from '@language-app/common';
import { LocalStorage } from "@utils";

export const BASE_AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const axiosErrorHandler = e => {
  // console.log({e: e.response.data})
  throw {status: e.response.status, message: e.response.data.message}
};

interface IApiContext {
  signInUseCase?: (args: ISignInAPIParams) => Promise<any>;
  signUpUseCase?: (args: ISignUpAPIParams) => Promise<ISignUpAPIResponse>;
  getUserUseCase?: () => Promise<IGetUserAPIResponse>;
  signOutUseCase?: () => Promise<void>;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
}

const localStorage = new LocalStorage();

const ApiContext = React.createContext<IApiContext>({})

export function ApiProvider({ children }) {

  const { language } = useLanguage();
  const [token, setToken] = React.useState<string>();

  const authAxios = React.useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: BASE_AUTH_URL,
      headers: {
        'accept-language': `${language};q=1`
      }
    })
    // axiosInstance.interceptors.response.use((response) => {
    //   console.log({response})
    //   if(response.data.token) axiosInstance.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
    //   return response;
    // });
    // console.log('instance headers',axiosInstance.defaults.headers)
    return axiosInstance;
  }, [language]);

  useEffect(() => {
    const tokenLS = localStorage.getRefreshToken();
    if(tokenLS && !token) {
      setToken(token);
    }
    // setToken(tokenLS);
    if(token) {
      localStorage.setRefreshToken(token);
    }
  }, [token]);

  const authAxiosGetFetcher = (url: string) =>
    authAxios.get(url).then(res => res.data).catch(axiosErrorHandler);
  const authAxiosPostFetcher = (url: string, body: any) =>
    authAxios.post(url, body).then(res => res.data).catch(axiosErrorHandler);

  const signUpUseCase = ({name, email, password, confirmPassword, role }) =>
    authAxiosPostFetcher('/signup', {
      name,
      email,
      password,
      confirmPassword,
      role
    });

  const signInUseCase = async ({email, password}) => {
    const { user, token } = await authAxiosPostFetcher('/signin', {
      email,
      password
    });
    setToken(token);
    return { user }
  }
  const signOutUseCase = async () => {
    await authAxiosPostFetcher('/signout', {});
    setToken("");
  }
  // const getUserUseCase = () => authAxiosGetFetcher('/user')

  return (
    <ApiContext.Provider value={{
      signInUseCase,
      signUpUseCase,
      getUserUseCase,
      signOutUseCase,
      setToken
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export const useApi = () => {
  return useContext(ApiContext);
}
