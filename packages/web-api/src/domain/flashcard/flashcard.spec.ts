import { FlashCard } from '.';
import { DomainRules } from '@language-app/common';
import { ErrorMessagesLabels } from '@common/locale';

describe('Unit Tests for flashcard entity', () => {
  const testCasesBucketValue = [0, 8, 15];
  testCasesBucketValue.map((bucket) =>
    it('Should throw if an invalid bucket value is passed.', () => {
      try {
        new FlashCard({
          bucket,
        });
      } catch (e) {
        expect(e).toMatchObject({ errorName: ErrorMessagesLabels.BUCKET_VALUE });
      }
    })
  );

  const testCasesTextLengths = [
    { front: 'a'.repeat(DomainRules.FLASHCARD.TEXT.MAX_LENGTH + 1), back: 'b' },
    { front: 'a'.repeat(DomainRules.FLASHCARD.TEXT.MIN_LENGTH - 1), back: 'b' },
    { front: 'a', back: 'b'.repeat(DomainRules.FLASHCARD.TEXT.MAX_LENGTH + 1) },
    { front: 'a', back: 'b'.repeat(DomainRules.FLASHCARD.TEXT.MIN_LENGTH - 1) },
  ];
  testCasesTextLengths.map(({ front, back }) =>
    it('Should throw if invalid text lengths are passed.', () => {
      try {
        new FlashCard({ front, back });
      } catch (e) {
        expect(e).toMatchObject({
          errorName: ErrorMessagesLabels.FLASHCARD_TEXT_LENGTH,
        });
      }
    })
  );

  DomainRules.FLASHCARD.BUCKETS.map((bucket) =>
    it('Should not throw if valid values are passed.', () => {
      const flashcard = new FlashCard({ bucket });
      expect(flashcard.bucket).toEqual(bucket);
    })
  );

  const testCasesMoveBucket = [
    // 1 day
    {
      currentTime: new Date(2023, 6, 27),
      bucket: 1,
      nextDue: new Date(2023, 6, 28).valueOf(),
    },
    // 2 days
    {
      currentTime: new Date(2023, 0, 31),
      bucket: 2,
      nextDue: new Date(2023, 1, 2).valueOf(),
    },
    // 4 days
    {
      currentTime: new Date(2023, 11, 30),
      bucket: 3,
      nextDue: new Date(2024, 0, 3).valueOf(),
    },
    // 8 days
    {
      currentTime: new Date(2023, 6, 27),
      bucket: 4,
      nextDue: new Date(2023, 7, 4).valueOf(),
    },
    // 16 days
    {
      currentTime: new Date(2023, 7, 1),
      bucket: 5,
      nextDue: new Date(2023, 7, 17).valueOf(),
    },
    // 32 days
    {
      currentTime: new Date(2023, 1, 27),
      bucket: 6,
      nextDue: new Date(2023, 2, 31).valueOf(),
    },
    // 64 days
    {
      currentTime: new Date(2023, 4, 1),
      bucket: 7,
      nextDue: new Date(2023, 6, 4).valueOf(),
    },
    // leap year: February has 29 days
    {
      currentTime: new Date(2024, 1, 27),
      bucket: 3,
      nextDue: new Date(2024, 2, 2).valueOf(),
    },
    {
      currentTime: new Date(2023, 1, 27),
      bucket: 3,
      nextDue: new Date(2023, 2, 3).valueOf(),
    },
  ];

  testCasesMoveBucket.map(({ currentTime, bucket, nextDue }) =>
    it('Should move card to next bucket and set nextDue correctly.', () => {
      jest.useFakeTimers('modern').setSystemTime(currentTime);
      const sut = new FlashCard({ bucket });
      sut.move();
      expect(sut.bucket).toBe(bucket + 1);
      expect(sut.nextDue).toBe(nextDue);
    })
  );

  const testCasesReset = [
    // 1 day
    {
      currentTime: new Date(2023, 6, 27),
      bucket: 1,
      nextDue: new Date(2023, 6, 28).valueOf(),
    },
    {
      currentTime: new Date(2023, 0, 31),
      bucket: 2,
      nextDue: new Date(2023, 1, 1).valueOf(),
    },
    {
      currentTime: new Date(2023, 11, 30),
      bucket: 3,
      nextDue: new Date(2023, 11, 31).valueOf(),
    },
  ];

  testCasesReset.map(({ currentTime, bucket, nextDue }) =>
    it('Should move card to next bucket and set nextDue correctly.', () => {
      jest.useFakeTimers('modern').setSystemTime(currentTime);
      const sut = new FlashCard({ bucket });
      sut.reset();
      expect(sut.bucket).toBe(1);
      expect(sut.nextDue).toBe(nextDue);
    })
  );
});
