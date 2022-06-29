import { IUser } from './types';

export interface ISignInAPIParams {
  id?: string;
  email?: string,
  password?: string
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

export interface ISignOutAPIParams {}
export interface ISignOutAPIResponse {}

export interface IGetUserAPIParams {}
export interface IGetUserAPIResponse extends IUser {};

export interface IUpdateUserParams {
  name?: string;
  role?: 'STUDENT' | 'INSTRUCTOR';
}
export interface IUpdateUserResponse {}

export interface IVerifyAccountParams {
  token: string;
  userId: string;
}

export interface IForgotPasswordParams {
  email: string;
}
export interface IForgotPasswordResponse {
  email: string;
}

// export interface IVerifyForgotPasswordParams {
//   token: string;
// }
// export interface IVerifyForgotPasswordResponse {}

export interface IResetPasswordParams {
  password?: string;
  confirmPassword?: string;
  token: string;
}
export interface IResetPasswordResponse {}
