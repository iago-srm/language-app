import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO,
} from '@application/ports';

export const mockTokenService: (args: any) => ITokenService = (args) => {
  return {
    generate: args.generate || jest.fn(),
    verify: args.verify || jest.fn(),
  }
};

export class MockEncryptionService implements IEncryptionService {
  constructor(
    public encrypt = jest.fn(),
    public compare = jest.fn()
  ) {}
};

export const mockUserRepository: (args: any) => IUserRepository = (args) => {
  return {
    getUserById: args.getUserById || jest.fn(),
    getUserByEmail: args.getUserByEmail || jest.fn(),
    updateUser: args.updateUser || jest.fn(),
    insertUser: args.insertUser || jest.fn(),
  }
};
