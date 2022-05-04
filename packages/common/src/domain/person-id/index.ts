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
    this.setEmail(args.email, args.emailValidator);
    this.setName(args.name);

    this.id = args.id;
  }

  setEmail(email: string, validator) {
    if (!validator(email)) throw new InvalidEmailError();
    this.email = email;
  }

  setName(name: string) {
    if (
      name.length < DomainRules.PERSONID.NAME.MIN_LENGTH ||
      name.length > DomainRules.PERSONID.NAME.MAX_LENGTH
    ) {
      throw new InvalidNameError();
    }
    this.name = name;
  }
}
