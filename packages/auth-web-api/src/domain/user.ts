import {
  InvalidPasswordError,
  InvalidRoleError
} from '@common/errors';
import {
  PersonId,
  validateEmail,
  DomainRules,
  AuthRules
} from '@language-app/common';

interface UserConstructorParams {
  name?: string;
  role: string;
  email: string;
  password: string;
}

export class User {
  personId: PersonId;
  role: string;
  password: string;

  constructor(args: UserConstructorParams) {
    this.setPersonId(args.email, args.name);
    this.setRole(args.role);
    this.setPassword(args.password);
  }

  setPersonId(email: string, name: string) {
    this.personId = new PersonId({ email, emailValidator: validateEmail, name })
  }

  setRole(role: string) {
    if(!DomainRules.USER.ROLES.includes(role)) throw new InvalidRoleError();
    this.role = role;
  }

  setPassword(password: string) {
    if(!AuthRules.PASSWORD_REGEX.test(password)) throw new InvalidPasswordError();
    this.password = password;
  }
}
