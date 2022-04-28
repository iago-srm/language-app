import { ActivityOption } from './option';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';

describe("Unit Tests for ActivityOption Entity", () => {

  it("Should not throw an error if valid parameters are passed to constructor.", () => {
    expect(() => {
      new ActivityOption({ text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MIN_LENGTH), isCorrect: true });
      new ActivityOption({ text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MAX_LENGTH), isCorrect: false })
    }).not.toThrow()
  });

  it("Should throw na error if invalid parameters are passed to constructor.", () => {
    try {
      new ActivityOption({ text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MIN_LENGTH - 1), isCorrect: true });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH})
    }
    try {
      new ActivityOption({ text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MAX_LENGTH + 1), isCorrect: false })
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH})
    }
  })
})
