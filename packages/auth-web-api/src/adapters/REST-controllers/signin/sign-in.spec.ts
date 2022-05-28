import { SignInControllerFactory } from './index';

describe("SignIn Controller Adapter", () => {
  const { controller: sut } = SignInControllerFactory({
    loginUseCase: { execute: jest.fn() }
  });

  it("Should throw an error if e-mail is not provided", () => {
    expect(() => sut({}, { password: "" }, {}, {})).toThrow();
    try {
      sut({}, { password: "" }, {}, {});
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'somefw'});
    }
  });
  it("Should throw an error if password is not provided", () => {
    expect(() => sut({}, { email: "" }, {}, {})).toThrow();
    try {
      sut({}, { email: "" }, {}, {});
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'somefw'});
    }
  });

})
