import { SignUpControllerFactory } from './index';
import { SignUpInputBuilder } from '@/common/test-helpers';

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
