import { EmailGenerator, PasswordGenerator } from '@language-app/common';
import { SignUpControllerFactory } from './index';

const emailGenerator = new EmailGenerator();
const passwordGenerator = new PasswordGenerator();

class SignUpInputBuilder {
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

const sutDataBuilder = new SignUpInputBuilder();

describe("SignIn Controller Adapter", () => {
  const { controller: sut } = SignUpControllerFactory({
    signUpUseCase: { execute: jest.fn() }
  });

  beforeEach(() => {
    sutDataBuilder.reset();
  });

  it("Should throw an error if e-mail is not provided", async () => {
    const input = sutDataBuilder.withoutEmail().getResult()
    await expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'parameter_not_provided'});
    }
  });

  it("Should throw an error if password is not provided", async () => {
    const input = sutDataBuilder.withoutPassword().getResult()
    await expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'parameter_not_provided'});
    }
  });

  it("Should throw an error if confirmPassword is not provided", async() => {
    const input = sutDataBuilder.withoutConfirmPassword().getResult()
    await expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'parameter_not_provided'});
    }
  });

  it("Should not throw an error if role is not provided", async () => {
    const input = sutDataBuilder.withoutRole().getResult()
    await expect(sut({}, input, {}, {})).resolves.toMatchObject({});
  });
})
