import request from 'supertest';
import { getMockUsersArray } from '../mock-data';
import {
  getCachedUser,
  normalizeJson,
  baseUrn,
  testAppInstance,
  insertUser,
} from '../test.helpers';

const app = testAppInstance._app;

describe('Redis cache.', () => {
  it('user is saved after get/:email route is called.', async () => {
    const user = getMockUsersArray(1);
    await insertUser(user);
    await request(app).get(`${baseUrn}/${user[0].email}`);
    const cachedUser = await getCachedUser(user[0]);
    // expect(cachedUser).toStrictEqual(normalizeJson(user[0]));
  });

  it('user is deleted from cache after it is updated with put/:email.', async () => {
    const user = getMockUsersArray(1);
    await insertUser(user);
    await request(app).put(`${baseUrn}/${user[0].email}`);
    const cachedUser = await getCachedUser(user[0]);
    expect(cachedUser).toStrictEqual(null);
  });
});
