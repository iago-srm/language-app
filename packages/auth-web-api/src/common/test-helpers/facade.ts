import {
  MockEncryptionService,
  MockTokenService,
  MockUserRepository,
  MockVerificationTokenRepository,
  MockIdGenerator,
  MockEmailService,
  SignInUpInputBuilder
} from '@common/test-helpers';
import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
  IEmailService,
} from '@application/ports';
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  UpdateUserUseCase,
  VerifyAccountUseCase
} from '@application/use-cases';

interface ConstructorParams {
  mockEncryptionService?: Partial<MockEncryptionService>,
  mockUserRepository?: Partial<MockUserRepository>,
  mockTokenService?: Partial<MockTokenService>,
  mockEmailService?: Partial<MockEmailService>;
  mockIdGenerator?: Partial<MockIdGenerator>,
}

export class TestDataFacade {

  public inputBuilder: SignInUpInputBuilder;
  public mockEncryptionService: IEncryptionService;
  public mockTokenService: ITokenService;
  public mockUserRepository: IUserRepository;
  public mockVerificationTokenRepository: MockVerificationTokenRepository;
  public mockIdGenerator: IIdGenerator;
  public mockEmailService: IEmailService;

  public sut: {
    signIn: SignInUseCase,
    signUp: SignUpUseCase,
    signOut: SignOutUseCase,
    updateUser: UpdateUserUseCase,
    validateAccount: VerifyAccountUseCase
  }

  constructor({
    mockEncryptionService,
    mockUserRepository ,
    mockTokenService,
    mockIdGenerator,
    mockEmailService
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
    });
    this.mockEmailService = new MockEmailService({
      sendEmail: mockEmailService?.sendEmail
    });

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
        this.mockIdGenerator,
        this.mockEmailService,
        this.mockVerificationTokenRepository
      ),
      signOut: new SignOutUseCase(
        this.mockUserRepository
      ),
      updateUser: new UpdateUserUseCase(
        this.mockUserRepository
      ),
      validateAccount: new VerifyAccountUseCase(
        this.mockUserRepository,
        this.mockVerificationTokenRepository
      )
    }

  }

}
