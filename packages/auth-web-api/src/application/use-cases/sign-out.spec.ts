import {
  TestDataFacade
} from '@common/test-helpers';
import { UserDTOHelperBuilder } from '@common/test-helpers';
import { ErrorMessages } from '@language-app/common';

describe('SignOut use case unit tests', () => {

  [0,4,19].map(tokenVersion => it('White-box testing, different token versions', async () => {

    const input = {
      id: '',
      tokenVersion: 0
    }

    const user = new UserDTOHelperBuilder().getResult();

    const testData = new TestDataFacade({
      mockUserRepository: {
        getUserById: jest.fn().mockResolvedValue(user),
      }
    });

    await testData.sut.signOut.execute(input);

    expect(testData.mockUserRepository.getUserById).toHaveBeenCalledWith(
      input.id
    );
    expect(testData.mockUserRepository.updateUser).toHaveBeenCalledWith(
      input.id,
      { tokenVersion: input.tokenVersion + 1 }
    );
  }))
});
