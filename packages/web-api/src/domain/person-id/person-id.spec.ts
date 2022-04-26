import { PersonId } from './index';
import { EmailGenerator, NameGenerator } from '@language-app/common';

describe("Tests for person-id entity", () => {

  const mockName = (new NameGenerator()).getName();

  (new EmailGenerator()).getInvalidEmails().map(email => it("Should throw an error if an invalid e-mail is passed", () => {
    expect(new PersonId({
      name: mockName,
      email: email
    }))
  }))
})
