import { EmailGenerator, PasswordGenerator } from '@language-app/common';

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class SignUpInputBuilder {
  private data;
  constructor() {
    this.reset();
  }
  reset() {
    this.data = {
      password: passwordGenerator.getValidPassword(),
      email: emailGenerator.getValidEmail(),
      confirmPassword: passwordGenerator.getValidPassword(),
      role: 'fsdfsd'
    };
  }
  getResult() {
    return this.data
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
}
