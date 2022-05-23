import { authAxiosPostFetcher, useApiCallFactory } from "../utils";
import {
  LoginAPIParams,
  LoginAPIResponse,
} from '@language-app/common';

export type LoginApi = (args: LoginAPIParams) => Promise<LoginAPIResponse>

const loginUseCase = ({email, password}) => {
  return authAxiosPostFetcher('/login', {
    email,
    password
  });
}

export const useLoginAPI = useApiCallFactory<LoginAPIParams, LoginAPIResponse>(loginUseCase);
