import { InvalidEmailError, InvalidNameError } from './errors';

interface PersonIdConstructorParams {
  id: string;
  email: string;
  name: string;
}

export class PersonId {
  public id: string;
  private email: string;
  private name: string;

  constructor(args: PersonIdConstructorParams) {
    this.id = args.id;
    this.validateEmail(args.email);
    this.email = args.email;
    this.validateName(args.name);
    this.name = args.name;
  }

  validateEmail(email: string) {
    if (email === 'zoado') throw new InvalidEmailError();
  }

  validateName(name: string) {
    if (name.length < 2) throw new InvalidNameError();
  }
}
