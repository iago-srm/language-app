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
  GetUserHTTPDefinition,
  IUpdateUserParams,
  IUpdateUserResponse,
  UpdateUserHTTPDefinition,
  IVerifyAccountParams,
  VerifyAccountHTTPDefinition,
  UpdateProfileImageHTTPDefinition,
  IForgotPasswordParams,
  IForgotPasswordResponse,
  ForgotPasswordRequestHTTPDefinition,
  IResetPasswordParams,
  IResetPasswordResponse,
  ResetPasswordHTTPDefinition
} from '@language-app/common-core';
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

  const updateUser = useApiCall<IUpdateUserParams,IUpdateUserResponse>
    ((args) => authFetcher[UpdateUserHTTPDefinition.method](UpdateUserHTTPDefinition.path, args));

  const verifyAccount = useApiCall<IVerifyAccountParams, void>
    (({token}) => authFetcher[VerifyAccountHTTPDefinition.method](`${VerifyAccountHTTPDefinition.path.split('/')[0]}/${token}`, { verified: true }));

  const uploadProfileImage = useApiCall<any, any>
    ((args) => authFetcher[UpdateProfileImageHTTPDefinition.method](UpdateProfileImageHTTPDefinition.path, args));

  const useUser = (canFetch: boolean) => useApiCallSWR<IGetUserAPIResponse>(canFetch && GetUserHTTPDefinition.path,authFetcher[GetUserHTTPDefinition.method].bind(authFetcher));

  const forgotPasswordRequest = useApiCall<IForgotPasswordParams, IForgotPasswordResponse>
    (({ email }) => authFetcher[ForgotPasswordRequestHTTPDefinition.method](ForgotPasswordRequestHTTPDefinition.path, { email }))

  const resetPassword = useApiCall<IResetPasswordParams,IResetPasswordResponse>
    ((args) => authFetcher[ResetPasswordHTTPDefinition.method](ResetPasswordHTTPDefinition.path, args));

  return {
    signUp,
    signIn,
    signOut,
    useUser,
    updateUser,
    verifyAccount,
    uploadProfileImage,
    forgotPasswordRequest,
    resetPassword
  }
}

export type {
  SignUp,
  SignIn,
  SignOut
} from './api-types';
