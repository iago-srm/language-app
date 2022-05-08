import {
  PersonId,
  validateEmail,
  DomainRules
} from '@language-app/common';
import { InvalidRoleError } from './errors';

interface UserConstructorParams {
  name: string;
  role: string;
  email: string;
}
export class User {
  personId: PersonId;
  role: string;

  constructor(args: Partial<UserConstructorParams>) {
    this.setPersonId(args.email, args.name);
    this.setRole(args.role);
  }

  setPersonId(email: string, name: string) {
    this.personId = new PersonId({ email, emailValidator: validateEmail, name})
  }

  setRole(role: string) {
    if(!DomainRules.USER.ROLES.includes(role)) throw new InvalidRoleError();
    this.role = role;
  }
}
