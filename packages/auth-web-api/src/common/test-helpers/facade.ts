import {
  SignInUpInputBuilder
} from '@common/test-helpers';
import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
  IAuthEmailService,
  IProfileImageRepository,
  IVerificationTokenRepository,
  IForgotPasswordTokenRepository
} from '@application/ports';
import {
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  UpdateUserUseCase,
  VerifyAccountUseCase,
  UpdateProfileImageUseCase,
  ForgotPasswordRequestUseCase,
  ResetPasswordUseCase
} from '@application/use-cases';

interface ConstructorParams {
  mockEncryptionService?: Partial<IEncryptionService>,
  mockUserRepository?: Partial<IUserRepository>,
  mockTokenService?: Partial<ITokenService>,
  mockEmailService?: Partial<IAuthEmailService>;
  mockIdGenerator?: Partial<IIdGenerator>,
  mockProfileImageRepository?: Partial<IProfileImageRepository>
  mockVerificationTokenRepository?: Partial<IVerificationTokenRepository>;
  mockForgotPasswordTokenRepository?: Partial<IForgotPasswordTokenRepository>;
}

export class TestDataFacade {

  public inputBuilder: SignInUpInputBuilder;

  public mockEncryptionService: IEncryptionService;
  public mockTokenService: ITokenService;
  public mockUserRepository: IUserRepository;
  public mockVerificationTokenRepository: IVerificationTokenRepository;
  public mockIdGenerator: IIdGenerator;
  public mockEmailService: IAuthEmailService;
  public mockProfileImageRepository: IProfileImageRepository;
  public mockForgotPasswordTokenRepository: IForgotPasswordTokenRepository;

  public sut: {
    signIn: SignInUseCase,
    signUp: SignUpUseCase,
    signOut: SignOutUseCase,
    updateUser: UpdateUserUseCase,
    verifyAccount: VerifyAccountUseCase,
    updateProfileImage: UpdateProfileImageUseCase,
    forgotPasswordRequest: ForgotPasswordRequestUseCase,
    resetPassword: ResetPasswordUseCase
  }

  constructor({
    mockEncryptionService,
    mockUserRepository ,
    mockTokenService,
    mockIdGenerator,
    mockEmailService,
    mockProfileImageRepository,
    mockVerificationTokenRepository,
    mockForgotPasswordTokenRepository
  }: ConstructorParams) {

    this.mockUserRepository = {
      getUserByEmail: mockUserRepository?.getUserByEmail || jest.fn(),
      getUserById: mockUserRepository?.getUserById || jest.fn(),
      insertUser: mockUserRepository?.insertUser || jest.fn(),
      updateUser: mockUserRepository?.updateUser || jest.fn()
    }

    this.mockEmailService = {
      sendForgotPasswordEmail: mockEmailService?.sendForgotPasswordEmail || jest.fn(),
      sendVerifyAccountEmail: mockEmailService?.sendVerifyAccountEmail || jest.fn()
    }

    this.mockEncryptionService = {
      encrypt: mockEncryptionService?.encrypt || jest.fn(),
      compare: mockEncryptionService?.compare || jest.fn()
    }

    this.mockIdGenerator = {
      getId: mockIdGenerator?.getId || jest.fn()
    }

    this.mockProfileImageRepository = {
      uploadProfileImage: mockProfileImageRepository?.uploadProfileImage || jest.fn(),
      getGenericImageUrl: mockProfileImageRepository?.getGenericImageUrl || jest.fn()
    }

    this.mockTokenService = {
      generate: mockTokenService?.generate || jest.fn(),
      verify: mockTokenService?.verify || jest.fn()
    }

    this.mockVerificationTokenRepository = {
      getTokenByUserId: mockVerificationTokenRepository?.getTokenByUserId || jest.fn(),
      insertToken: mockVerificationTokenRepository?.insertToken || jest.fn()
    }

    this.mockForgotPasswordTokenRepository = {
      getTokenByTokenValue: mockForgotPasswordTokenRepository?.getTokenByTokenValue || jest.fn(),
      insertToken: mockForgotPasswordTokenRepository?.insertToken || jest.fn(),
      invalidateToken: mockForgotPasswordTokenRepository?.invalidateToken || jest.fn()
    }


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
        this.mockIdGenerator,
        this.mockEmailService,
        this.mockVerificationTokenRepository,
        this.mockProfileImageRepository
      ),
      signOut: new SignOutUseCase(
        this.mockUserRepository
      ),
      updateUser: new UpdateUserUseCase(
        this.mockUserRepository
      ),
      verifyAccount: new VerifyAccountUseCase(
        this.mockUserRepository,
        this.mockVerificationTokenRepository
      ),
      updateProfileImage: new UpdateProfileImageUseCase(
        this.mockUserRepository,
        this.mockProfileImageRepository
      ),
      resetPassword: new ResetPasswordUseCase(
        this.mockUserRepository,
        this.mockForgotPasswordTokenRepository,
        this.mockEncryptionService
      ),
      forgotPasswordRequest: new ForgotPasswordRequestUseCase(
        this.mockUserRepository,
        this.mockForgotPasswordTokenRepository,
        this.mockEmailService,
        this.mockIdGenerator
      )
    }
  }
}
