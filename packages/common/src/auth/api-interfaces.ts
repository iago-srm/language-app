import { IUser } from './types';

export interface ISignInAPIParams {
  email: string,
  password: string
}

export interface ISignInAPIResponse {
  token: string;
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

export interface IGetUserAPIResponse extends IUser {};

export interface IProviderSignInParams {
  image: string;
  provider: string;
  id: string;
  email: string,
  name: string,
}

export interface IProviderSignInResponse {
  token: string;
}

export interface IUpdateUserParams {
  name?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
}
