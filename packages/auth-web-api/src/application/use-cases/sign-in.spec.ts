import SignInUseCase from './sign-in';
import {
  MockEncryptionService,
  mockTokenService,
  mockUserRepository
} from './test-mocks';
import { TestUserDTOHelper } from '@common/test-helpers';

describe('SignIn in use case unit tests', () => {

  it('Should call depending services appropriately', async () => {
    const user = new TestUserDTOHelper().getUser();
    const mockEncryptionService = new MockEncryptionService(
      jest.fn().mockResolvedValue(true)
    );
    const sut = new SignInUseCase(
      mockUserRepository({
        getUserByEmail: jest.fn().mockResolvedValue(user),
      }),
      mockEncryptionService,
      mockTokenService({}),
    );

    await sut.execute({
      email: 'test-email',
      password: 'test-password',
    });

    expect(mockEncryptionService.compare).toHaveBeenCalledWith(
      'test-password',
      user.hashedPassword
    );
  });
});
