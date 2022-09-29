export interface UserDTO {
  id: string;
  name?: string;
  email: string;
  role?: string;
  hashedPassword?: string;
  tokenVersion: number;
  image?: string;
  emailVerified: boolean;
  provider?: string;
}

export interface VerificationTokenDTO {
  id?: string;
  token: string;
  createdAt?: Date;
  userId?: string;
}

export interface ForgotPasswordTokenDTO {
  id?: string;
  token: string;
  createdAt?: Date;
  expiresAt?: Date;
  userId?: string;
}
