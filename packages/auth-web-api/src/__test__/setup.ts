import { start, deleteAll } from "./test.helpers";

export const baseUrn = `/api/v1/users`;

beforeAll(() => {
  return start();
});

beforeEach(() => {
  return deleteAll();
});
