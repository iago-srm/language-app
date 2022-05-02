import { ActivityOption } from './option';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';

describe('Unit Tests for ActivityOption Entity', () => {
  it('Should not throw an error if valid parameters are passed to constructor, and should set the values.', () => {
    const minText = 'a'.repeat(DomainRules.ACTIVITY.OPTION.MIN_LENGTH);
    const sut1 = new ActivityOption({ text: minText, isCorrect: true });
    expect(sut1.text).toEqual(minText);
    expect(sut1.isCorrect).toEqual(true);
    const maxText = 'a'.repeat(DomainRules.ACTIVITY.OPTION.MAX_LENGTH);
    const sut2 = new ActivityOption({ text: maxText, isCorrect: false });
    expect(sut2.text).toEqual(maxText);
    expect(sut2.isCorrect).toEqual(false);
  });

  it('Should throw na error if invalid parameters are passed to constructor.', () => {
    try {
      new ActivityOption({
        text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MIN_LENGTH - 1),
        isCorrect: true,
      });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH,
      });
    }
    try {
      new ActivityOption({
        text: 'a'.repeat(DomainRules.ACTIVITY.OPTION.MAX_LENGTH + 1),
        isCorrect: false,
      });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.ACTIVITY_OPTION_LENGTH,
      });
    }
  });
});
