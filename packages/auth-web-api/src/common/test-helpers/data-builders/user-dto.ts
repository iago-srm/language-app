import { EmailGenerator, PasswordGenerator } from '@language-app/common-utils';
import { threadId } from 'worker_threads';
import { AbstractBuilder } from './abstract-builder';

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

export class UserDTOHelperBuilder extends AbstractBuilder{
  constructor() {
    super();
  }

  reset() {
    this.data = {
      id: '1',
      email: emailGenerator.getValidEmail(),
      hashedPassword: 'hashed-password',
      name: 'valid',
      role: 'STUDENT',
      tokenVersion: 0,
      emailVerified: true
    };
  }

  withInvalidEmail() {
    this.data.email = emailGenerator.getInvalidEmails[0];
    return this;
  }

  withTokenVersion(tokenVersion: number) {
    this.data.tokenVersion = tokenVersion;
    return this;
  }

  withRole(role: string) {
    this.data.role = role;
    return this;
  }

}
