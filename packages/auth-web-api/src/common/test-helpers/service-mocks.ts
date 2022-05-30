import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
} from '@application/ports';

export class MockEncryptionService implements IEncryptionService {
  public encrypt;
  public compare;
  constructor({
    encrypt = jest.fn(),
    compare = jest.fn()
  }) {
    this.encrypt = encrypt;
    this.compare = compare;
  }
};

export class MockTokenService implements ITokenService{
  public verify;
  public generate;
  constructor ({
    generate = jest.fn(),
    verify = jest.fn(),
  }) {
    this.generate = generate;
    this.verify = verify;
  }
};

export class MockUserRepository implements IUserRepository {
  public getUserById;
  public getUserByEmail;
  public updateUser;
  public insertUser;

  constructor ({
    getUserById = jest.fn(),
    getUserByEmail = jest.fn(),
    updateUser = jest.fn(),
    insertUser = jest.fn(),
  }) {
    this.getUserByEmail = getUserByEmail;
    this.getUserById = getUserById;
    this.insertUser = insertUser;
    this.updateUser = updateUser;
  }
};
