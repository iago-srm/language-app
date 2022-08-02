import {
  UserDTO,
  VerificationTokenDTO,
  ForgotPasswordTokenDTO
} from './dtos';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | null>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  insertUser: (user: UserDTO) => Promise<UserDTO>;
  updateUser: (id: string, user: Partial<UserDTO>) => Promise<UserDTO>;
}

export interface IVerificationTokenRepository {
  getTokenByTokenValue: (token: string) => Promise<VerificationTokenDTO | null>;
  insertToken: (token: VerificationTokenDTO) => Promise<VerificationTokenDTO>;
}

export interface IForgotPasswordTokenRepository {
  getTokenByTokenValue: (token: string) => Promise<ForgotPasswordTokenDTO | null>;
  insertToken: (token: ForgotPasswordTokenDTO) => Promise<ForgotPasswordTokenDTO>;
  invalidateToken: (token: ForgotPasswordTokenDTO) => Promise<ForgotPasswordTokenDTO>;
}

export interface IProfileImageRepository {
  uploadProfileImage: (file: any, userId: string) => Promise<string>;
  getGenericImageUrl: () => string;
}
