import { UseApiCallResponse } from './hooks';
import {
  ISignUpAPIParams,
  ISignUpAPIResponse,
  ISignInAPIParams,
  ISignInAPIResponse,
  ISignOutAPIParams,
  ISignOutAPIResponse,
  IGetUserAPIParams,
  IGetUserAPIResponse,
} from '@language-app/common-core';

export type SignIn = UseApiCallResponse<ISignInAPIParams, ISignInAPIResponse>;
export type SignUp = UseApiCallResponse<ISignUpAPIParams, ISignUpAPIResponse>;
export type SignOut = UseApiCallResponse<ISignOutAPIParams, ISignOutAPIResponse>;
export type GetUser = UseApiCallResponse<IGetUserAPIParams, IGetUserAPIResponse>;
