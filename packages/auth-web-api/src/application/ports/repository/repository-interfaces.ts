import { UserDTO, VerificationTokenDTO } from '.';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | null>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  insertUser: (user: UserDTO) => Promise<UserDTO>;
  updateUser: (id: string, user: Partial<UserDTO>) => Promise<UserDTO>;
}

export interface IVerificationTokenRepository {
  getTokenByUserId: (id: string) => Promise<VerificationTokenDTO | null>;
  insertToken: (token: VerificationTokenDTO) => Promise<VerificationTokenDTO>;
}

export interface IProfileImageRepository {
  uploadProfileImage: (file: any, userId: string) => Promise<string>;
  // getProfileImageUrl: (userId?: string) => string;
}
