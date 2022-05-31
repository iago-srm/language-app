import {
  MockEncryptionService,
  MockTokenService,
  MockUserRepository,
  MockIdGenerator,
  SignInUpInputBuilder
} from '@common/test-helpers';
import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
} from '@application/ports';
import { SignInUseCase, SignUpUseCase } from '@application/use-cases';

interface ConstructorParams {
  mockEncryptionService?: Partial<MockEncryptionService>,
  mockUserRepository?: Partial<MockUserRepository>,
  mockTokenService?: Partial<MockTokenService>,
  mockIdGenerator?: Partial<MockIdGenerator>
}

export class TestDataFacade {
  public inputBuilder: SignInUpInputBuilder;
  public mockEncryptionService: IEncryptionService;
  public mockTokenService: ITokenService;
  public mockUserRepository: IUserRepository;
  public mockIdGenerator: IIdGenerator;
  public sut: {
    signIn: SignInUseCase,
    signUp: SignUpUseCase
  }
  constructor({
    mockEncryptionService,
    mockUserRepository ,
    mockTokenService,
    mockIdGenerator
  }: ConstructorParams) {
    this.mockEncryptionService = new MockEncryptionService({
      compare: mockEncryptionService?.compare,
      encrypt: mockEncryptionService?.encrypt
    });
    this.mockTokenService = new MockTokenService({
      generate: mockTokenService?.generate,
      verify: mockTokenService?.verify
    });
    this.mockUserRepository = new MockUserRepository({
      getUserByEmail: mockUserRepository?.getUserByEmail,
      getUserById: mockUserRepository?.getUserById,
      insertUser: mockUserRepository?.insertUser,
      updateUser: mockUserRepository?.updateUser
    });
    this.mockIdGenerator = new MockIdGenerator({
      getId: mockIdGenerator?.getId
    })
    this.inputBuilder = new SignInUpInputBuilder();
    this.sut = {
      signIn: new SignInUseCase(
        this.mockUserRepository,
        this.mockEncryptionService,
        this.mockTokenService
      ),
      signUp: new SignUpUseCase(
        this.mockUserRepository,
        this.mockEncryptionService,
        this.mockTokenService,
        this.mockIdGenerator
      )
    }

  }

}
