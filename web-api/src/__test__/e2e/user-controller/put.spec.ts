import request from 'supertest';
import { getMockUsersArray, getValidRandomPassword } from '../../mock-data';
import { UserMessageNames, UserMessages } from '../../../common/locales';
import {
    testAppInstance,
    baseUrn,
    insertUser,
    getUser,
} from '../../test.helpers';

const app = testAppInstance._app;

describe('PUT users/:email :: Route updates user specified by e-mail.', () => {
    it('Route returns 200 O status code.', async () => {
        const user = getMockUsersArray(1);
        await insertUser(user);
        const response = await request(app)
            .put(`${baseUrn}/${user[0].email}`)
            .send({
                password: getValidRandomPassword(),
            });
        expect(response.status).toBe(200);
    });

    it('Route successfully updates user password.', async () => {
        const user = getMockUsersArray(1);
        await insertUser(user);
        const newPassword = getValidRandomPassword();
        await request(app).put(`${baseUrn}/${user[0].email}`).send({
            password: newPassword,
        });
        const updatedUser = await getUser(user[0].email);
        if (updatedUser) expect(updatedUser[0].password).toBe(newPassword);
        else fail('failed to insert user to test.');
    });

    const testWithLang = (lang: string) =>
        it.each([
            [
                'password',
                'none',
                (UserMessages as any)[lang][
                    UserMessageNames.PASSWORD.NOT_PROVIDED
                ],
            ],
            [
                'password',
                'a'.repeat(2),
                (UserMessages as any)[lang][
                    UserMessageNames.PASSWORD.INVALID_LENGTH
                ],
            ],
            [
                'password',
                'a'.repeat(35),
                (UserMessages as any)[lang][
                    UserMessageNames.PASSWORD.INVALID_LENGTH
                ],
            ],
            [
                'password',
                'asasasa',
                (UserMessages as any)[lang][
                    UserMessageNames.PASSWORD.INVALID_PATTERN
                ],
            ],
            [
                'password',
                'asasasaASASAS',
                (UserMessages as any)[lang][
                    UserMessageNames.PASSWORD.INVALID_PATTERN
                ],
            ],
            [
                'password',
                null,
                (UserMessages as any)[lang][UserMessageNames.PASSWORD.NULL],
            ],
            [
                'email',
                'none',
                (UserMessages as any)[lang][
                    UserMessageNames.EMAIL.INVALID_PATTERN
                ],
            ],
            [
                'email',
                null,
                (UserMessages as any)[lang][
                    UserMessageNames.EMAIL.INVALID_PATTERN
                ],
            ],
            [
                'email',
                'email',
                (UserMessages as any)[lang][
                    UserMessageNames.EMAIL.INVALID_PATTERN
                ],
            ],
        ])(
            `VALIDATION(${lang}): When %s field is %s, returns \"%s\" message`,
            async (field, value, expectedMessage) => {
                const user = getMockUsersArray(1)[0];
                if (value === 'none') delete (user as any)[field];
                else (user as any)[field] = value;
                const response = await request(app)
                    .put(`${baseUrn}/${user.email}`)
                    .set('Accept-Language', lang)
                    .send({ ...user });
                expect(response.body.errors[0].message).toBe(expectedMessage);
                expect(response.status).toBe(400);
            }
        );

    testWithLang('en');
    testWithLang('pt');
});
