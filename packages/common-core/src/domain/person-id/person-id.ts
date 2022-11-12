import { InvalidEmailError, InvalidNameError } from "./errors";
import { AuthRules } from "@language-app/common-core";

interface PersonIdConstructorParams {
  id?: string;
  emailValidator: (email: string) => boolean;
  email: string;
  name?: string;
}

export class PersonId {
  id?: string;
  email?: string;
  name?: string;

  constructor(args: PersonIdConstructorParams) {
    if (args.email) this.setEmail(args.email, args.emailValidator);
    if (args.name) this.setName(args.name);

    this.id = args.id;
  }

  setEmail(email: string, validator) {
    if (!validator(email)) throw new InvalidEmailError();
    this.email = email;
  }

  setName(name: string) {
    if (
      name.length < AuthRules.PERSONID.NAME.MIN_LENGTH ||
      name.length > AuthRules.PERSONID.NAME.MAX_LENGTH
    ) {
      throw new InvalidNameError();
    }
    this.name = name;
  }
}
