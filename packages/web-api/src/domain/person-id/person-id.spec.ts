import { PersonId } from './index';
import { EmailGenerator, NameGenerator, validateEmail } from '@language-app/common';
import { DomainRules } from '@language-app/common';

describe("Unit Tests for person-id entity", () => {

  const mockName = (new NameGenerator()).getName();
  const emailGenerator = new EmailGenerator();

  emailGenerator.getInvalidEmails().map(email => it("Should throw an error when invalid e-mail is passed", () => {
    try {
      new PersonId({
        name: mockName,
        emailValidator: validateEmail,
        email
      })
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'invalid_email'})
    }
  }))

  it("Should create object when valid e-mail and name are passed.", () => {
    expect(() => new PersonId({
      name: mockName,
      emailValidator: validateEmail,
      email: emailGenerator.getValidEmail()
    })).not.toThrow()
  })

  const testCases = ['p'.repeat(DomainRules.PERSONID.NAME.MAX_LENGTH+1), 'o']
  testCases.map(name => it("Should throw when an invalid name is passed", () => {
    try {
      new PersonId({
        name: name,
        emailValidator: validateEmail,
        email: emailGenerator.getValidEmail()
      })
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'invalid_name', params: {
        min: DomainRules.PERSONID.NAME.MIN_LENGTH,
        max: DomainRules.PERSONID.NAME.MAX_LENGTH,
      }})
    }
  }))
})
