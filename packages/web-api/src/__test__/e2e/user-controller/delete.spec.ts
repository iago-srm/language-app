import request from "supertest";
import { UserMessageNames, UserMessages } from "../../../common/locales";
import { getMockUsersArray } from "../../mock-data";
import {
  testAppInstance,
  baseUrn,
  insertUser,
  getUser,
} from "../../test.helpers";

const app = testAppInstance._app;

describe("DELETE users/:email :: Route deletes user by email", () => {
  it("Route returns 200 OK status code if user exists.", async () => {
    const user = getMockUsersArray(1);
    const insertedUsers = await insertUser(user);
    if (insertedUsers[0]) {
      const response = await request(app).del(
        `${baseUrn}/${insertedUsers[0].email}`
      );
      expect(response.status).toBe(200);
    } else {
      fail("Could not successfully insert test user.");
    }
  });

  it("Route returns 404 Not Found status code if user doesn't exist.", async () => {
    const user = getMockUsersArray(1)[0];
    const response = await request(app).del(`${baseUrn}/${user.email}`);
    expect(response.status).toBe(404);
  });

  it("Successfully deletes user from database.", async () => {
    const user = getMockUsersArray(1);
    const insertedUsers = await insertUser(user);
    if (insertedUsers[0]) {
      await request(app).del(`${baseUrn}/${insertedUsers[0].email}`);
      const insertedUser = (await getUser(insertedUsers[0].email))[0];
      expect(insertedUser).toBeFalsy();
    } else {
      fail("Could not successfully insert test user.");
    }
  });

  const testWithLang = (lang: string) =>
    it.each([
      [
        "email",
        "none",
        (UserMessages as any)[lang][UserMessageNames.EMAIL.INVALID_PATTERN],
      ],
      [
        "email",
        null,
        (UserMessages as any)[lang][UserMessageNames.EMAIL.INVALID_PATTERN],
      ],
      [
        "email",
        "email",
        (UserMessages as any)[lang][UserMessageNames.EMAIL.INVALID_PATTERN],
      ],
    ])(
      `VALIDATION(${lang}): When %s field is %s, returns \"%s\" message`,
      async (field, value, expectedMessage) => {
        const user = getMockUsersArray(1);
        const insertedUsers = await insertUser(user);
        if (insertedUsers[0]) {
          if (value === "none") delete (user[0] as any)[field];
          else (user[0] as any)[field] = value;
          const response = await request(app)
            .del(`${baseUrn}/${user[0].email}`)
            .set("Accept-Language", lang);
          expect(response.body.errors[0].message).toBe(expectedMessage);
          expect(response.status).toBe(400);
        } else {
          fail("Could not successfully insert test user.");
        }
      }
    );

  testWithLang("en");
  testWithLang("pt");
});
