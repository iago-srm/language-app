import SignInUseCase from './sign-in';
import {
  MockEncryptionService,
  MockTokenService,
  MockUserRepository,
  SignUpInputBuilder
} from '@common/test-helpers';
import { UserDTOHelperBuilder } from '@/common/test-helpers/data-builders/user-dto';

describe('SignIn in use case unit tests', () => {

  it('White-box test', async () => {
    const inputBuilder = new SignUpInputBuilder();
    const user = new UserDTOHelperBuilder().getResult();
    const mockEncryptionService = new MockEncryptionService({
      compare: jest.fn().mockResolvedValue(true)
    });
    const mockUserRepository = new MockUserRepository({
      getUserByEmail: jest.fn().mockResolvedValue(user),
    });
    const mockTokenService = new MockTokenService({});

    const sut = new SignInUseCase(
      mockUserRepository,
      mockEncryptionService,
      mockTokenService
    );

    await sut.execute(inputBuilder.getResult());

    expect(mockEncryptionService.compare).toHaveBeenCalledWith(
      inputBuilder.getResult().password,
      user.hashedPassword
    );
    expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
      inputBuilder.getResult().email
    );
    expect(mockTokenService.generate).toHaveBeenCalledWith({
      id: user.id,
      tokenVersion: user.tokenVersion
    })
  });

  it("Should throw if user with that e-mail is not found", () => {

  });

  it("Should throw if password passed is different from database", () => {

  });

  it("Should return a token with id and tokenVersion inside", () => {

  })
});
