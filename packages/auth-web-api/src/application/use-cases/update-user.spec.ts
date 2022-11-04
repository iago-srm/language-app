import {
  TestDataFacade
} from '@common/test-helpers';
import { UserDTOHelperBuilder } from '@common/test-helpers';
import { ErrorMessagesLabels } from '@common/locale';

describe.skip('UpdateUser use case unit tests', () => {

  test('UpdateUser gets called with a valid id and a valid role, and doesn\'t throw', async () => {

    const input = {
      userId: 'dfdfwccr',
      role: 'STUDENT'
    };

    const user = new UserDTOHelperBuilder().getResult();

    const testData = new TestDataFacade({
      mockUserRepository: {
        getUserById: jest.fn().mockResolvedValue(user),
      }
    });

    await testData.sut.updateUser.execute(input)

    expect(testData.mockUserRepository.getUserById).toHaveBeenCalledWith(
      input.userId
    );
    expect(testData.mockUserRepository.updateUser).toHaveBeenCalledWith(
      input.userId,
      { role: input.role }
    );
  });

  test('If UpdateUser gets called with an invalid id, it throws UserNotFound error', async () => {

    const input = {
      userId: 'dfdfwccr',
      role: 'STUDENT'
    };

    const testData = new TestDataFacade({
      mockUserRepository: {
        getUserById: jest.fn().mockResolvedValue(undefined),
      }
    });

    expect(testData.sut.updateUser.execute(input)).rejects.toThrow()

    try {
      await testData.sut.updateUser.execute(input)
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessagesLabels.USER_NOT_FOUND })
    }
  });

  test('If UpdateUser gets called with an invalid role, it throws InvalidRole error', async () => {

    const input = {
      userId: 'dfdfwccr',
      role: 'invalid role'
    };
    const user = new UserDTOHelperBuilder().getResult();


    const testData = new TestDataFacade({
      mockUserRepository: {
        getUserById: jest.fn().mockResolvedValue(user),
      }
    });

    expect(testData.sut.updateUser.execute(input)).rejects.toThrow()

    try {
      await testData.sut.updateUser.execute(input)
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessagesLabels.INVALID_ROLE })
    }
  })

});
