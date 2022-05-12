import * as helpers from '@iagosrm/common';
import { User } from '../domain';

export const getValidRandomPassword = () =>
  'a'.repeat(Math.random() * 8 + 5) +
  'A'.repeat(Math.random() * 8 + 5) +
  '8787';

export const getMockUsersArray = (length: number) => {
  return [...Array(length)]
    .map((_, i) => i)
    .map(() => {
      const testUser = new User();
      testUser.email = helpers.getRandomEmail();
      testUser.username = helpers.getRandomString(10);
      testUser.password = getValidRandomPassword();
      return testUser;
    });
};
