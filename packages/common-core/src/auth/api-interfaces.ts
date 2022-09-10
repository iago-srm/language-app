import { IUser } from './types';

export interface ISignInAPIParams {
  email: string,
  password: string
}

export interface ISignInAPIResponse {
  token: string;
}

export interface IGoogleSignInAPI {
  params: {
    id: string;
  }
  response: {
    token: string;
  };
}

export interface ISignUpAPIParams {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
}

export interface ISignUpAPIResponse {
  token: string;
}

export interface IGoogleSignUpAPI {
  params: {
    id: string;
    name: string;
    email: string;
  }
  response: void;
}
export interface ISignOutAPIParams {}
export interface ISignOutAPIResponse {}

export interface IGetUserAPIParams {}
export interface IGetUserAPIResponse extends IUser {};

export interface IUpdateUserParams {
  name?: string;
  role?: 'STUDENT' | 'INSTRUCTOR' | string;
}
export interface IUpdateUserResponse {}

export interface IVerifyAccountParams {
  token: string;
}

export interface IForgotPasswordParams {
  email: string;
}
export interface IForgotPasswordResponse {
  email: string;
}

export interface IResetPasswordParams {
  password?: string;
  confirmPassword?: string;
  token: string;
}
export interface IResetPasswordResponse {}

export interface IGetActivitiesParams {}
export type IGetActivitiesResponse = {
  cursor: number;
  activities: {
    id: string;
    title: string;
    description?: string;
    cefr: string;
    topics: string[];
  }[]
}