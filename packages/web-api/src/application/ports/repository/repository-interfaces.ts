import { UserDTO } from '.';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | undefined>;
  getUserByEmail: (email: string) => Promise<UserDTO | undefined>;
  insertUser: (user: UserDTO) => Promise<boolean>;
  updateUser: (user: UserDTO) => Promise<boolean>;
}

