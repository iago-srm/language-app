import {
  TestDataFacade
} from '@common/test-helpers';
import { UserDTOHelperBuilder } from '@common/test-helpers';
import { ErrorMessages } from '@language-app/common';

describe('SignIn in use case unit tests', () => {

  it('White-box testing', async () => {

    const user = new UserDTOHelperBuilder().getResult();

    const testData = new TestDataFacade({
      mockEncryptionService: {
        compare: jest.fn().mockResolvedValue(true)
      },
      mockUserRepository: {
        getUserByEmail: jest.fn().mockResolvedValue(user)
      }
    });

    await testData.sut.signIn.execute(testData.inputBuilder.getResult());

    expect(testData.mockEncryptionService.compare).toHaveBeenCalledWith(
      testData.inputBuilder.getResult().password,
      user.hashedPassword
    );
    expect(testData.mockUserRepository.getUserByEmail).toHaveBeenCalledWith(
      testData.inputBuilder.getResult().email
    );
    expect(testData.mockTokenService.generate).toHaveBeenCalledWith({
      id: user.id,
      tokenVersion: user.tokenVersion
    })
  });

  it("Should throw if user with that e-mail is not found", async () => {
    const testData = new TestDataFacade({
      mockUserRepository: {
        getUserByEmail: jest.fn().mockResolvedValue(null)
      }
    });

    await expect(testData.sut.signIn.execute(testData.inputBuilder.getResult())).rejects.toThrow();

    try {
      await testData.sut.signIn.execute(testData.inputBuilder.getResult());
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.INVALID_CREDENTIALS })
    }
  });

  it("Should throw if password passed is different from database", async () => {
    const testData = new TestDataFacade({
      mockEncryptionService: {
        compare: jest.fn().mockResolvedValue(false)
      },
      mockUserRepository: {
        getUserByEmail: jest.fn().mockResolvedValue({})
      }
    });
    const input = testData.inputBuilder.getResult();
    const user = new UserDTOHelperBuilder().getResult();

    await expect(testData.sut.signIn.execute(input)).rejects.toThrow();
    expect(testData.mockEncryptionService.compare).toHaveBeenCalledWith(
      input.password,
      user.hashedPassword
    );

    try {
      await testData.sut.signIn.execute(testData.inputBuilder.getResult());
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.INVALID_CREDENTIALS })
    }
  });

});
