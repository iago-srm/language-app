import SignInUseCase from './sign-in';
import {
  MockEncryptionService,
  mockTokenService,
  mockUserRepository
} from './test-mocks';
import { UserDTOHelperBuilder } from '@/common/test-helpers/user-dto';

describe.skip('SignIn in use case unit tests', () => {

  it('Should call depending services appropriately', async () => {
    const user = new UserDTOHelperBuilder().getResult();
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
