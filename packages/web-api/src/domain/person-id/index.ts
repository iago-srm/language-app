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
    this.validateEmail(args.email, args.emailValidator);
    this.validateName(args.name);

    this.id = args.id;
    this.email = args.email;
    this.name = args.name;
  }

  validateEmail(email: string, validator) {
    if (!validator(email)) throw new InvalidEmailError();
  }

  validateName(name: string) {
    if (name.length < DomainRules.PERSONID.NAME.MIN_LENGTH ||
      name.length > DomainRules.PERSONID.NAME.MAX_LENGTH) {
        throw new InvalidNameError();
      }
  }
}
