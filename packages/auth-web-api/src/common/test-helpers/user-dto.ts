import { UserDTO } from '@application/ports';
import { EmailGenerator, PasswordGenerator } from '@language-app/common';

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class UserDTOHelperBuilder {
  private data: UserDTO;
  constructor() {
    this.reset();
  }
  reset() {
    this.data = {
      id: '1',
      email: emailGenerator.getValidEmail(),
      hashedPassword: 'hashed-password',
      name: 'valid',
      role: 'STUDENT',
      tokenVersion: 0
    };
  }

  getResult() {
    return this.data;
  }

  withInvalidEmail() {
    this.data.email = emailGenerator.getInvalidEmails[0];
  }
}
