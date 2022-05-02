import { UserMessageNames, UserMessages } from '../../../common/locales';
import request from 'supertest';
import { getMockUsersArray } from '../../mock-data';
import {
  testAppInstance,
  baseUrn,
  insertUser,
  getUser,
} from '../../test.helpers';

const app = testAppInstance._app;

describe('POST users/ :: Route inserts a new user.', () => {
  it('Route returns 200 status code.', async () => {
    const user = getMockUsersArray(1)[0];
    const response = await request(app)
      .post(baseUrn)
      .send({ ...user });
    expect(response.status).toBe(200);
  });

  it('Route returns no body.', async () => {
    const user = getMockUsersArray(1)[0];
    const response = await request(app)
      .post(baseUrn)
      .send({ ...user });
    expect(response.body).toEqual({});
  });

  it('New user is saved successfuly in database.', async () => {
    const user = getMockUsersArray(1)[0];
    await request(app)
      .post(baseUrn)
      .send({ ...user });
    const savedUser = (await getUser(user.email))[0];
    expect(savedUser).toEqual(expect.objectContaining(user));
  });

  it('Trying to save a user with a repeated e-mail returns 409 status code.', async () => {
    const user = getMockUsersArray(1);
    await insertUser(user);
    const response = await request(app)
      .post(baseUrn)
      .send({ ...user[0] });
    expect(response.status).toBe(409);
  });

  const testWithLang = (lang: string) =>
    it.each([
      [
        'username',
        'none',
        (UserMessages as any)[lang][UserMessageNames.USERNAME.NOT_PROVIDED],
      ],
      [
        'username',
        'a'.repeat(2),
        (UserMessages as any)[lang][UserMessageNames.USERNAME.INVALID_LENGTH],
      ],
      [
        'username',
        'a'.repeat(35),
        (UserMessages as any)[lang][UserMessageNames.USERNAME.INVALID_LENGTH],
      ],
      [
        'username',
        null,
        (UserMessages as any)[lang][UserMessageNames.USERNAME.NULL],
      ],
      [
        'password',
        'none',
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.NOT_PROVIDED],
      ],
      [
        'password',
        'a'.repeat(2),
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.INVALID_LENGTH],
      ],
      [
        'password',
        'a'.repeat(35),
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.INVALID_LENGTH],
      ],
      [
        'password',
        'asasasa',
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.INVALID_PATTERN],
      ],
      [
        'password',
        'asasasaASASAS',
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.INVALID_PATTERN],
      ],
      [
        'password',
        null,
        (UserMessages as any)[lang][UserMessageNames.PASSWORD.NULL],
      ],
      [
        'email',
        'none',
        (UserMessages as any)[lang][UserMessageNames.EMAIL.NOT_PROVIDED],
      ],
      ['email', null, (UserMessages as any)[lang][UserMessageNames.EMAIL.NULL]],
      [
        'email',
        'email',
        (UserMessages as any)[lang][UserMessageNames.EMAIL.INVALID_PATTERN],
      ],
    ])(
      `VALIDATION(${lang}): When %s field is %s, returns \"%s\" message`,
      async (field, value, expectedMessage) => {
        const user = getMockUsersArray(1)[0];
        if (value === 'none') delete (user as any)[field];
        else (user as any)[field] = value;
        const response = await request(app)
          .post(baseUrn)
          .set('Accept-Language', lang)
          .send({ ...user });
        expect(response.body.errors[0].message).toBe(expectedMessage);
        expect(response.status).toBe(400);
      }
    );

  testWithLang('en');
  testWithLang('pt');
});
