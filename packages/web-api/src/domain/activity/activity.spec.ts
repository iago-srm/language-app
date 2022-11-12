import { Activity } from ".";
import { DomainRules } from "@language-app/common-core";
import { ErrorMessagesLabels } from "@common/locale";

describe("Unit Tests for Activity Entity", () => {
  it("Should throw an error if invalid activity topic is passed to constructor.", () => {
    expect(() => new Activity({ topics: ["fdsfdsfs"] })).toThrow();
    try {
      new Activity({ topics: ["fdsfdsfs"] });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_TOPIC,
      });
    }
  });

  it("Should throw an error if time to complete is over max.", () => {
    expect(
      () =>
        new Activity({
          topics: DomainRules.ACTIVITY.TOPICS,
          // timeToComplete: DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE + 1,
        })
    ).toThrow();
    try {
      new Activity({
        topics: DomainRules.ACTIVITY.TOPICS,
        // timeToComplete: DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE + 1,
      });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_TIME_TO_COMPLETE,
      });
    }
  });

  it("Should not throw an error if valid parameters are passed.", () => {
    const activity = new Activity({
      topics: DomainRules.ACTIVITY.TOPICS,
      // timeToComplete: DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE - 1,
    });
    expect(activity.topics).toEqual(DomainRules.ACTIVITY.TOPICS);
    expect(activity.timeToComplete).toEqual(
      DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE - 1
    );
  });

  it("Should throw na error if activity text is too long", () => {
    expect(
      () =>
        new Activity({
          contentType: "TEXT",
          content: "a".repeat(DomainRules.ACTIVITY.MAX_TEXT_LENGTH + 1),
        })
    ).toThrow();
    try {
      new Activity({
        contentType: "TEXT",
        content: "a".repeat(DomainRules.ACTIVITY.MAX_TEXT_LENGTH + 1),
      });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_TEXT_LENGTH,
      });
    }
  });

  it("Should throw an error if activity length is larger than max", () => {
    expect(() => {
      new Activity({
        contentType: "YOUTUBE",
        startTime: 0,
        endTime: DomainRules.ACTIVITY.MAX_VIDEO_LENGTH + 1,
      });
    }).toThrow();
    try {
      new Activity({
        contentType: "YOUTUBE",
        startTime: 0,
        endTime: DomainRules.ACTIVITY.MAX_VIDEO_LENGTH + 1,
      });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_LENGTH,
      });
    }
  });

  it("Should validate times so that start is before end", () => {
    expect(
      () => new Activity({ contentType: "VIDEO", startTime: 11, endTime: 10 })
    ).toThrow();
    try {
      new Activity({ contentType: "VIDEO", startTime: 11, endTime: 10 });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_TIMES,
      });
    }
  });

  DomainRules.ACTIVITY.CONTENTTYPE.map((contentType) =>
    it("Should not throw an error if valid activity type is passed to constructor.", () => {
      const sut = new Activity({ contentType });
      expect(sut.contentType).toEqual(contentType);
    })
  );

  it("Should throw an error if invalid activity type is passed to constructor.", () => {
    expect(() => new Activity({ contentType: "fdsfdsfs" })).toThrow();
    try {
      new Activity({ contentType: "fdsfdsfs" });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessagesLabels.ACTIVITY_TYPE });
    }
  });

  it("Should validate video url with validator and throw an error if it is invalid", () => {
    expect(
      () => new Activity({ contentType: "VIDEO", content: "ffdfdfedfed" })
    ).toThrow();
    try {
      new Activity({ contentType: "VIDEO", content: "ffdfdfedfed" });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.ACTIVITY_VIDEO_URL,
      });
    }
  });

  it("Should not throw an error if video times are good, and set them", () => {
    const sut = new Activity({
      contentType: "YOUTUBE",
      startTime: 0,
      endTime: DomainRules.ACTIVITY.MAX_VIDEO_LENGTH - 1,
    });
    expect(sut.startTime).toEqual(0);
    expect(sut.endTime).toEqual(DomainRules.ACTIVITY.MAX_VIDEO_LENGTH - 1);
  });

  it("Should throw if invalid CEFR value is passed.", () => {
    expect(() => new Activity({ cefr: "C3" })).toThrow();
    try {
      new Activity({ cefr: "C3" });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessagesLabels.CEFR,
        params: {
          possibleValues: DomainRules.CEFR.POSSIBLE_VALUES,
        },
      });
    }
  });

  DomainRules.CEFR.POSSIBLE_VALUES.map((cefr) =>
    it("Should not throw if valid CEFR value is passed.", () => {
      const sut = new Activity({ cefr });
      expect(sut.cefr).toEqual(cefr);
    })
  );

  it("Should throw an error if invalid parameters are passed to title", () => {
    {
      // title above max length
      const newActivity = () =>
        new Activity({
          title: "a".repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH + 1),
          description: "a".repeat(DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH),
        });
      expect(newActivity()).toThrow();
      try {
        newActivity();
      } catch (e) {
        expect(e).toMatchObject({
          errorName: ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH,
        });
      }
    }

    {
      // title below min length
      const newActivity = () =>
        new Activity({
          title: "a".repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH - 1),
          description: "a".repeat(DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH),
        });
      expect(newActivity()).toThrow();
      try {
        newActivity();
      } catch (e) {
        expect(e).toMatchObject({
          errorName: ErrorMessagesLabels.ACTIVITY_TITLE_LENGTH,
        });
      }
    }
  });

  it("Should throw an error if invalid parameters are passed to description", () => {
    {
      // description below min length
      const newActivity = () =>
        new Activity({
          title: "a".repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH),
          description: "a".repeat(
            DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH - 1
          ),
        });
      expect(newActivity()).toThrow();
      try {
        newActivity();
      } catch (e) {
        expect(e).toMatchObject({
          errorName: ErrorMessagesLabels.ACTIVITY_DESCRIPTION_LENGTH,
        });
      }
    }

    // description above max length
    {
      const newActivity = () =>
        new Activity({
          title: "a".repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH),
          description: "a".repeat(
            DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH + 1
          ),
        });
      expect(newActivity()).toThrow();
      try {
        newActivity();
      } catch (e) {
        expect(e).toMatchObject({
          errorName: ErrorMessagesLabels.ACTIVITY_DESCRIPTION_LENGTH,
        });
      }
    }
  });

  it("Should not throw an error if valid title and description parameters are passed to constructor, and values should be set.", () => {
    const minTitle = "a".repeat(DomainRules.ACTIVITY.TITLE.MIN_LENGTH);
    const maxTitle = "a".repeat(DomainRules.ACTIVITY.TITLE.MAX_LENGTH);
    const minDescription = "a".repeat(
      DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH
    );
    const maxDescription = "a".repeat(
      DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH
    );

    const version1 = new Activity({
      title: minTitle,
      description: minDescription,
    });
    const version2 = new Activity({
      title: maxTitle,
      description: maxDescription,
    });
    expect(version1.title).toEqual(minTitle);
    expect(version1.description).toEqual(minDescription);
    expect(version2.title).toEqual(maxTitle);
    expect(version2.description).toEqual(maxDescription);
  });
});
