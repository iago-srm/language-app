import { InvalidEmailError, InvalidNameError } from './errors';
import { DomainRules } from '@language-app/common';

interface PersonIdConstructorParams {
  id?: string;
  emailValidator: (email: string) => boolean;
  email: string;
  name: string;
}

export class PersonId {
  public id?: string;
  email: string;
  name: string;

  constructor(args: PersonIdConstructorParams) {
    this.validateAndSetEmail(args.email, args.emailValidator);
    this.validateAndSetName(args.name);

    this.id = args.id;
  }

  validateAndSetEmail(email: string, validator) {
    if (!validator(email)) throw new InvalidEmailError();
    this.email = email;
  }

  validateAndSetName(name: string) {
    if (name.length < DomainRules.PERSONID.NAME.MIN_LENGTH ||
      name.length > DomainRules.PERSONID.NAME.MAX_LENGTH) {
        throw new InvalidNameError();
      }
      this.name = name;
  }
}
