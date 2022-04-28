import { ActivityVersion } from './version';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';

describe("Unit Tests for ActivityVersion Entity", () => {

  it("Should not throw an error if valid parameters are passed to constructor.", () => {
    expect(() => {
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH)
      });
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH)
      });
    }).not.toThrow()
  });

  it("Should throw an error if invalid parameters are passed to constructor.", () => {
    // title above max length
    try {
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH + 1),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH)
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TITLE_LENGTH})
    }

    // description above max length
    try {
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH + 1)
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_DESCRIPTION_LENGTH})
    }

    // title below min length
    try {
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH - 1),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH)
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TITLE_LENGTH})
    }

    // description below min length
    try {
      new ActivityVersion({
        title: 'a'.repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH),
        description: 'a'.repeat(DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH - 1)
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_DESCRIPTION_LENGTH})
    }

  })
});
