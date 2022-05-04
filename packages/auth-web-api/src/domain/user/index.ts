import { PersonId, validateEmail, DomainRules } from '@language-app/common';

interface UserConstructorParams {
  name: string;
  role: string;
  email: string;
}
export class User {
  personId: PersonId;

  constructor(args: UserConstructorParams) {
    this.setPersonId(args.email, args.name);
    this.setRole(args.role);
  }

  setPersonId(email: string, name: string) {
    this.personId = new PersonId({ email, emailValidator: validateEmail, name})
  }

  setRole(role: string) {
    if(!DomainRules.USER.ROLES.includes(role)) throw new
  }
}
