export interface UserDTO {
  id: string;
  name?: string;
  email: string;
  role?: string;
  hashedPassword?: string;
  tokenVersion: number;
  image?: string;
  provider?: string;
}
