import { UserDTO, ExtractDTO, CategoryDTO } from '.';

export interface IUserRepository {
  getUserById: (id: string) => Promise<UserDTO | undefined>;
  getUserByEmail: (email: string) => Promise<UserDTO | undefined>;
  insertUser: (user: UserDTO) => Promise<boolean>;
  updateUser: (user: UserDTO) => Promise<boolean>;
}

export interface IExtractRepository {
  getAllFromUser: (userId: string) => Promise<ExtractDTO[]>;
  getById: (extractId: string) => Promise<ExtractDTO | undefined>;
  addExtracts: (extracts: ExtractDTO[]) => Promise<boolean>;
  getByCategoryId: (categoryId: string) => Promise<ExtractDTO[]>;
}

export interface ICategoryRepository {
  getAllFromUser: (userId: string) => Promise<CategoryDTO[]>;
  getByNameFromUser: (
    userId: string,
    category: string
  ) => Promise<CategoryDTO[]>;
  getById: (categoryId: string) => Promise<CategoryDTO | undefined>;
  updateCategory: (category: Partial<CategoryDTO>) => Promise<boolean>;
}
