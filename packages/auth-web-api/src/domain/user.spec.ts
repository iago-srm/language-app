import { User } from "./index";
import { DomainRules } from "@language-app/common-core";
import { ErrorMessagesLabels } from "@common/locale";
import { EmailGenerator, PasswordGenerator } from "@language-app/common-utils";

class UserTestBuilder {
  emailGenerator = new EmailGenerator();
  passwordGenerator = new PasswordGenerator();

  withInvalidRole() {
    return new User({
      email: this.emailGenerator.getValidEmail(),
      password: this.passwordGenerator.getValidPassword(),
      role: "adfaefe",
    });
  }

  withInvalidPassword() {
    return new User({
      email: this.emailGenerator.getValidEmail(),
      role: DomainRules.USER.ROLES[0],
      password: this.passwordGenerator.getInvalidPassword(),
    });
  }

  valid(r?: string, e?: string, p?: string, n?: string) {
    return new User({
      name: n || "iago",
      email: e || this.emailGenerator.getValidEmail(),
      role: r || DomainRules.USER.ROLES[0],
      password: p || this.passwordGenerator.getValidPassword(),
    });
  }
}

describe("Unit Tests for User Entity", () => {
  const sutBuilder = new UserTestBuilder();

  it("Should throw if invalid role is passed", () => {
    expect(sutBuilder.withInvalidRole).toThrow();

    try {
      sutBuilder.withInvalidRole();
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.INVALID_ROLE,
      });
    }
  });

  it("Should correctly set role, password and e-mail if validations pass", () => {
    const role = DomainRules.USER.ROLES[0];
    const email = sutBuilder.emailGenerator.getValidEmail();
    const password = sutBuilder.passwordGenerator.getValidPassword();

    const sut = sutBuilder.valid(role, email, password);

    expect(sut.personId.email).toEqual(email);
    expect(sut.password).toEqual(password);
    expect(sut.role).toEqual(role);
  });

  it("Should throw if an invalid password is passed", () => {
    expect(sutBuilder.withInvalidPassword).toThrow();

    try {
      sutBuilder.withInvalidPassword();
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.INVALID_PASSWORD,
      });
    }
  });
});
