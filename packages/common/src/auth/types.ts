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
