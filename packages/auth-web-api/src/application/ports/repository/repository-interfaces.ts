import { UserDTO } from '.';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | null>;
  getUserByEmail: (email: string) => Promise<UserDTO | null>;
  insertUser: (user: UserDTO) => Promise<UserDTO>;
  updateUser: (id: string, user: Partial<UserDTO>) => Promise<UserDTO>;
}
