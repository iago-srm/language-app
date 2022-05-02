import { LoginUseCaseFactory } from '@application/use-cases';
import { IUserRepository, IEncryptionService, ITokenService, UserDTO } from '@application/ports';
import { TestUserDTOHelper } from '@common/test-helpers';

describe("Login in use case unit tests", () => {

    const mockTokenService: ITokenService = {
        generate: jest.fn(),
        verify: jest.fn()
    };

    const mockEncryptionService: IEncryptionService = {
        encrypt: jest.fn(),
        compare: jest.fn()
    };

    const mockUserRepository: IUserRepository = {
        getUserById: jest.fn(),
        getUserByEmail: jest.fn(),
        updateUser: jest.fn(),
        insertUser: jest.fn(),
    }

    const sut = LoginUseCaseFactory({
        userRepository: mockUserRepository,
        encryptionService: mockEncryptionService,
        tokenService: mockTokenService
    });

    it("Make sure depending services are called appropriately", async () => {
        const user = new TestUserDTOHelper().getUser();
        
        // make sure credentials will be accepted
        mockUserRepository.getUserByEmail = jest.fn().mockResolvedValue(user);
        mockEncryptionService.compare = jest.fn().mockResolvedValue(true);
        
        await sut.execute({
            email: 'test-email',
            password: 'test-password'
        });

        expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith('test-email');
        expect(mockEncryptionService.compare).toHaveBeenCalledWith('test-password',user.hashedPassword);
        expect(mockTokenService.generate).toHaveBeenLastCalledWith({
            id: user.id,
            name: user.name,
            email: user.email
        });
    });

})