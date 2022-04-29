import { ActivityContent } from './content';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';
import { jest } from '@jest/globals';

describe("Unit Tests for ActivityContent Entity", () => {

  it("Should throw an error if invalid activity type is passed to constructor.", () => {
    try {
      new ActivityContent({ type: 'fdsfdsfs' });
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TYPE });
    }
  });

  DomainRules.ACTIVITY.TYPES.ALL.map(type => it("Should not throw an error if valid activity type is passed to constructor.", () => {
    expect(() => new ActivityContent({ type })).not.toThrow()
  }));

  it("Should validate video url with validator and not throw an error if it is valid.", () => {
    const type = 'YOUTUBE'
    const validators = { [type]: { validate: jest.fn((url: string) => true)}};
    const testUrl = 'fdsfdfsfedef';
    expect(() => new ActivityContent({ type, videoUrl: testUrl, validators })).not.toThrow();
    expect(validators[type].validate).toHaveBeenCalledWith(testUrl)
  });

  it("Should validate video url with validator and throw an error if it is invalid.", () => {
    try {
      const type = 'YOUTUBE'
      const validators = { [type]: { validate: jest.fn((_: string) => false)}};
      const testUrl = 'ffdfdfedfed';
      new ActivityContent({ type, videoUrl: testUrl, validators });
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_VIDEO_URL });
    }
  });

  it("Should validate times so that start is before end.", () => {
    try {
      new ActivityContent({ type: 'YOUTUBE', startTime: 11, endTime: 10});
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_VIDEO_TIMES })
    }
  });

  it("Should throw an error if activity length is larger than max.", () => {
    try {
      new ActivityContent({
        type: 'YOUTUBE',
        startTime: 0,
        endTime: DomainRules.ACTIVITY.MAX_VIDEO_LENGTH + 1
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_VIDEO_LENGTH })
    }
  });

  it("Should not throw an error if video times are good.", () => {
    expect(() => new ActivityContent({
      type: 'YOUTUBE',
      startTime: 0,
      endTime: DomainRules.ACTIVITY.MAX_VIDEO_LENGTH - 1
    }))
  });

  it("Should throw na error if text activity is too long.", () => {
    try {
      new ActivityContent({
        type: 'TEXT',
        text: 'a'.repeat(DomainRules.ACTIVITY.MAX_TEXT_LENGTH+1)
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_TEXT_LENGTH })
    }
  })
})

