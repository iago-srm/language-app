import { SignInControllerFactory } from "./sign-in";

describe.skip("SignIn Controller Adapter", () => {
  const { controller: sut } = SignInControllerFactory({
    signInUseCase: { execute: jest.fn() },
  });

  it("Should not throw an error if e-mail is not provided", async () => {
    expect(sut({}, { password: "" }, {}, {})).resolves.toMatchObject({
      statusCode: 201,
    });
  });

  it("Should not throw an error if password is not provided", async () => {
    expect(sut({}, { email: "" }, {}, {})).resolves.toMatchObject({
      statusCode: 201,
    });
  });
});
