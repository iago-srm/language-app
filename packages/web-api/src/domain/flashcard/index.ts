import { DomainRules } from "@language-app/common-core";
import {
  InvalidBucketValueError,
  InvalidFlashcardTextLengthError,
} from "../errors";

export interface FlashCardConstructorParams {
  nextDue: string;
  bucket: number;
  front: string;
  back: string;
}

export class FlashCard {
  id?: string;
  bucket: number;
  front: string;
  back: string;
  nextDue: number;

  constructor(args: Partial<FlashCardConstructorParams>) {
    this.setBucket(args.bucket);
    this.setTexts({ front: args.front, back: args.back });
  }

  setBucket(bucket: number) {
    if (!bucket) return;
    if (!DomainRules.FLASHCARD.BUCKETS.includes(bucket))
      throw new InvalidBucketValueError();
    this.bucket = bucket;
  }

  setTexts(args: { front: string; back: string }) {
    const { front, back } = args;
    if (!front || !back) return;
    [front, back].forEach((text) => {
      if (
        text.length >= DomainRules.FLASHCARD.TEXT.MAX_LENGTH ||
        text.length <= DomainRules.FLASHCARD.TEXT.MIN_LENGTH
      ) {
        throw new InvalidFlashcardTextLengthError();
      }
    });
    this.front = front;
    this.back = back;
  }

  setNextDue() {
    this.nextDue = new Date(
      new Date().valueOf() + 24 * 60 * 60 * 1000 * Math.pow(2, this.bucket - 1)
    ).valueOf();
  }

  move() {
    this.setNextDue();
    this.bucket += 1;
  }

  reset() {
    this.bucket = 1;
    this.setNextDue();
  }
}
