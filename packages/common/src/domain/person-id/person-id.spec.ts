import { PersonId } from './index';
import { AuthRules } from '../../auth';
import { ErrorMessages } from '../../locale';

class PersonIdTestBuilder {

  withInvalidShortName() {
    return new PersonId({
      email: '',
      name: 'a'.repeat(AuthRules.PERSONID.NAME.MIN_LENGTH - 1),
      emailValidator: () => true
    });
  }

  withInvalidLongName() {
    return new PersonId({
      email: '',
      name: 'a'.repeat(AuthRules.PERSONID.NAME.MAX_LENGTH + 1),
      emailValidator: () => true
    });
  }

  withInvalidEmail() {
    return new PersonId({
      email: '',
      name: 'a'.repeat(AuthRules.PERSONID.NAME.MIN_LENGTH + 1),
      emailValidator: () => false
    });
  }

  valid(n?: string, e?: string) {
    return new PersonId({
      email: e || '',
      name: n || 'a'.repeat(AuthRules.PERSONID.NAME.MIN_LENGTH + 1),
      emailValidator: () => true
    });
  }
}

describe("Unit Tests for PersonId Entity", () => {
  const sutBuilder = new PersonIdTestBuilder();

  it("emailValidator function should receive email value", () => {

    const email = 'testEmail';
    const emailValidator = jest.fn(() => true);

    new PersonId({
      email,
      name: 'a'.repeat(AuthRules.PERSONID.NAME.MIN_LENGTH + 1),
      emailValidator
    });

    expect(emailValidator).toHaveBeenCalledWith(email);
  })

  it("Should throw if emailValidator rejects email", () => {

    expect(sutBuilder.withInvalidEmail).toThrow()

    try{
      sutBuilder.withInvalidEmail()
    } catch(e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.INVALID_EMAIL
      })
    }
  });

  it("Should correctly set e-mail and name if validations pass", () => {

    const name = 'a'.repeat(AuthRules.PERSONID.NAME.MIN_LENGTH + 1);
    const email = 'testEmail';

    const sut = sutBuilder.valid(name, email)

    expect(sut.email).toEqual(email);
    expect(sut.name).toEqual(name);
  });

  it("Should throw if an invalid name is passed", () => {

    expect(sutBuilder.withInvalidLongName).toThrow()

    try{
      sutBuilder.withInvalidLongName()
    } catch(e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.INVALID_NAME
      })
    }

    expect(sutBuilder.withInvalidShortName).toThrow()

    try{
      sutBuilder.withInvalidShortName()
    } catch(e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.INVALID_NAME
      })
    }

  });
});
