import { LoginUseCaseFactory } from '@application/use-cases';
import {
  MockEncryptionService,
  mockTokenService,
  mockUserRepository
} from './test-mocks';
import { TestUserDTOHelper } from '@common/test-helpers';

describe('Login in use case unit tests', () => {



  it('Make sure depending services are called appropriately', async () => {
    const user = new TestUserDTOHelper().getUser();
    const mockEncryptionService = new MockEncryptionService(
      jest.fn().mockResolvedValue(true)
    );
    // const mockTokenService = new
    const sut = LoginUseCaseFactory({
      userRepository: mockUserRepository({
        getUserByEmail: jest.fn().mockResolvedValue(user),
      }),
      encryptionService: mockEncryptionService,
      tokenService: mockTokenService({}),
    });

    await sut.execute({
      email: 'test-email',
      password: 'test-password',
    });

    // expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
    //   'test-email'
    // );
    expect(mockEncryptionService.compare).toHaveBeenCalledWith(
      'test-password',
      user.hashedPassword
    );
    // expect(mockTokenService.generate).toHaveBeenLastCalledWith({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    // });
  });
});
