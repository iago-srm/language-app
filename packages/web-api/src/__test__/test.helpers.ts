import {
  container as testContainer,
  Dependencies,
} from '../main/dependency-injection/containers';
import { Application } from '../frameworks/http/express/app';
import { User } from '@domain';
import { RedisProxy } from 'src/frameworks';

export const normalizeJsonArray = (arr: any[]) => {
  return arr.map((obj: any) => normalizeJson(obj));
};

export const normalizeJson = (obj: any) => {
  return JSON.parse(JSON.stringify({ ...obj }));
};

export const baseUrn = `/api/v1/users`;

export const testAppInstance: Application = testContainer.resolve(
  Dependencies.APP
) as Application;
const testDbInstance: RedisProxy = testContainer.resolve(Dependencies.DB);

export const start = () => {
  return testAppInstance.start();
};

export const deleteAll = () => {
  return testDbInstance.deleteAll();
};

export const insertUser = (users: User[]) => {
  return testDbInstance._connection.getRepository('users').save(users);
};

export const getUser = (email: string) => {
  return testDbInstance._connection
    .getRepository<User>('users')
    .find({ email });
};

export const getCachedUser = (user) => {
  return testDbInstance._redisClient.asyncGet(
    testDbInstance._redisClient._getEntryName('users', {
      email: user.email,
    })
  );
};
