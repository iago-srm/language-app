import { User } from '@domain';

const usersTable: User[] = [];

export default {
  getUser: jest.fn((email) => usersTable.find((e) => e.email === email)),
  getAllUsers: jest.fn().mockReturnValue(usersTable),
  insertUser: jest.fn((user) => {
    if (usersTable.find((e) => e.email === user.email)) {
      throw Error();
    }
    usersTable.push(user);
  }),
};
