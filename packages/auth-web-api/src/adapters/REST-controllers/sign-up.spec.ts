import { SignUpControllerFactory } from "./sign-up";
import { SignInUpInputBuilder } from "@/common/test-helpers";

const sutDataBuilder = new SignInUpInputBuilder();

describe("SignUp Controller Adapter", () => {
  const { controller: sut } = SignUpControllerFactory({
    signUpUseCase: { execute: jest.fn() },
  });

  beforeEach(() => {
    sutDataBuilder.reset();
  });

  it("Should throw an error if e-mail is not provided", async () => {
    const input = sutDataBuilder.withoutEmail().getResult();
    expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should throw an error if password is not provided", async () => {
    const input = sutDataBuilder.withoutPassword().getResult();
    expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should throw an error if confirmPassword is not provided", async () => {
    const input = sutDataBuilder.withoutConfirmPassword().getResult();
    expect(sut({}, input, {}, {})).rejects.toThrow();
    try {
      await sut({}, input, {}, {});
    } catch (e) {
      expect(e).toMatchObject({ errorName: "parameter_not_provided" });
    }
  });

  it("Should not throw an error if role is not provided", () => {
    const input = sutDataBuilder.withoutRole().getResult();
    expect(sut({}, input, {}, {})).resolves.toMatchObject({});
  });
});
