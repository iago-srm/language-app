import { authAxiosPostFetcher, useApiCallFactory } from "../utils";
import {
  LoginAPIParams,
  LoginAPIResponse,
} from '@language-app/common';

export type LoginApi = (args: LoginAPIParams) => Promise<LoginAPIResponse>

export const loginUseCase = ({email, password}) => {
  return authAxiosPostFetcher('/login', {
    email,
    password
  });
}

export const signupUseCase = ({email, password, confirmPassword}) => {
  return authAxiosPostFetcher('/signup', {
    email,
    password,
    confirmPassword
  });
}

export const useLoginAPI = useApiCallFactory<LoginAPIParams, LoginAPIResponse>(loginUseCase);
