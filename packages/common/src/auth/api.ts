export interface ISignInAPIParams {
  email: string,
  password: string
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  image: string;
  role: string;
}

export interface ITokenContent {
  id: string;
  tokenVersion: number;
}

export interface ISignInAPIResponse {
  token: string;
  user: IUser;
}

export interface ISignUpAPIResponse {
  token: string;
  user: IUser;
}

export interface ISignUpAPIParams {
  email: string,
  name: string,
  password: string,
  confirmPassword: string,
  role: string,
}

export interface IGetUserAPIResponse extends IUser {};
