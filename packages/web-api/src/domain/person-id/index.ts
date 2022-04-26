import { InvalidEmailError, InvalidNameError } from './errors';
import { PersonIdRules } from './rules';

interface PersonIdConstructorParams {
  id?: string;
  emailValidator: (email: string) => boolean;
  email: string;
  name: string;
}

export class PersonId {
  public id?: string;
  private email: string;
  private name: string;

  constructor(args: PersonIdConstructorParams) {
    this.id = args.id;
    this.validateEmail(args.email, args.emailValidator);
    this.email = args.email;
    this.validateName(args.name);
    this.name = args.name;
  }

  validateEmail(email: string, validator) {
    if (!validator(email)) throw new InvalidEmailError();
  }

  validateName(name: string) {
    if (name.length < PersonIdRules.NAME.MIN_LENGTH ||
      name.length > PersonIdRules.NAME.MAX_LENGTH) {
        throw new InvalidNameError({
          min: PersonIdRules.NAME.MIN_LENGTH,
          max: PersonIdRules.NAME.MAX_LENGTH
        });
      }
  }
}
