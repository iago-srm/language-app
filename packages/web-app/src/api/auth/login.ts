import { getAuthAxiosGetFetcher, getAuthAxiosPostFetcher, useApiCallFactory } from "../utils";
import {
  LoginAPIParams,
  LoginAPIResponse,
} from '@language-app/common';

export type LoginApi = (args: LoginAPIParams) => Promise<LoginAPIResponse>

export const loginUseCase = ({email, password}) => {
  return getAuthAxiosPostFetcher()('/login', {
    email,
    password
  });
}

export const signupUseCase = ({name, email, password, confirmPassword, role }) => {
  return getAuthAxiosPostFetcher()('/signup', {
    name,
    email,
    password,
    confirmPassword,
    role
  });
}

export const getUserUseCase = () => getAuthAxiosGetFetcher()('/user')

export const useLoginAPI = useApiCallFactory<LoginAPIParams, LoginAPIResponse>(loginUseCase);
