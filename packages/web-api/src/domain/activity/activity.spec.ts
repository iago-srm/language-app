import { Activity } from '.';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';
import { jest } from '@jest/globals';

describe("Unit Tests for Activity Entity", () => {

  it("Should throw an error if invalid activity topic is passed to constructor.", () => {
    try {
      new Activity({ topic: 'fdsfdsfs', timeToComplete: 5 });
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TOPIC });
    }
  });

  it("Should throw an error if time to complete is over max.", () => {
    try {
      new Activity({ topic: DomainRules.ACTIVITY.TOPICS[0], timeToComplete: DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE + 1 });
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TIME_TO_COMPLETE });
    }
  });

  it("Should not throw an error if valid parameters are passed.", () => {
    const activity = new Activity({ topic: DomainRules.ACTIVITY.TOPICS[0], timeToComplete: DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE - 1 })
    expect(activity.topic).toEqual(DomainRules.ACTIVITY.TOPICS[0])
    expect(activity.timeToComplete).toEqual(DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE - 1)
  })
})
