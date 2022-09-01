import { EmailGenerator, PasswordGenerator } from '@language-app/common-utils';
import { AbstractBuilder } from './abstract-builder';

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class SignInUpInputBuilder extends AbstractBuilder{
  constructor() {
    super();
  }
  reset() {
    this.data = {
      password: passwordGenerator.getValidPassword(),
      email: emailGenerator.getValidEmail(),
      confirmPassword: passwordGenerator.getValidPassword(),
      role: 'fsdfsd'
    };
  }
  withoutPassword() {
    delete this.data.password;
    return this;
  }
  withoutEmail() {
    delete this.data.email;
    return this;
  }
  withoutRole() {
    delete this.data.role;
    return this;
  }
  withoutConfirmPassword() {
    delete this.data.confirmPassword;
    return this;
  }
  withEmail(email: string) {
    this.data.email = email;
    return this;
  }
}
