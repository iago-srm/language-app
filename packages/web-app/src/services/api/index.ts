import {
  useApiCall,
  useApiCallSWR,
} from './hooks';
import {
  AxiosFetcher
} from './frameworks';
import {
  ISignUpAPIParams,
  ISignUpAPIResponse,
  SignUpHTTPDefinition,
  ISignInAPIParams,
  ISignInAPIResponse,
  SignInHTTPDefinition,
  SignOutHTTPDefinition,
  IGetUserAPIResponse,
  GetUserHTTPDefinition
} from '@language-app/common';
import { useLanguage, handleAuthToken } from '@contexts';
import { useEffect } from 'react';

export const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;
export const DOMAIN_BASE_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/v1`;

const signInFetcher = new AxiosFetcher(AUTH_BASE_URL);
const authFetcher = new AxiosFetcher(AUTH_BASE_URL);
const domainFetcher = new AxiosFetcher(DOMAIN_BASE_URL);

signInFetcher.setInterceptor((res) => {
  handleAuthToken(res.data.token);
  return res;
});

export const setCommonHeaders = (header: string, value: any) => {
  const fetchers = [signInFetcher, authFetcher, domainFetcher];
  fetchers.forEach(fetcher => fetcher.setHeader(header, value));
}

export const useApiBuilder = () => {

  const { language } = useLanguage();

  useEffect(() => {
    setCommonHeaders('X-Accept-Language',`${language};q=1`);
  }, [language]);

  const signUp = useApiCall<ISignUpAPIParams,ISignUpAPIResponse>
    ((args) => authFetcher[SignUpHTTPDefinition.method](SignUpHTTPDefinition.path, args));
  const signIn = useApiCall<ISignInAPIParams,ISignInAPIResponse>
    ((args) => signInFetcher[SignInHTTPDefinition.method](SignInHTTPDefinition.path, args));
  const signOut = useApiCall<void,void>
    ((args) => authFetcher[SignOutHTTPDefinition.method](SignOutHTTPDefinition.path, args));
  const useUser = (canFetch: boolean) => useApiCallSWR<IGetUserAPIResponse>(canFetch && GetUserHTTPDefinition.path,authFetcher[GetUserHTTPDefinition.method].bind(authFetcher)/*, { fallbackData: {} }*/);

  return {
    signUp,
    signIn,
    signOut,
    useUser
  }
}

export type {
  SignUp,
  SignIn,
  SignOut
} from './api-types';
