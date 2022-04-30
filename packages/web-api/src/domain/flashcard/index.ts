import { DomainRules } from '@language-app/common';
import {
  InvalidBucketValueError,
  InvalidFlashcardTextLengthError
} from '../errors';

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
    if(args.bucket) this.validateAndSetBucket(args.bucket);
    if(args.front && args.back) this.validateAndSetTexts({ front: args.front, back: args.back });
  }

  validateAndSetBucket(bucket: number) {
    if(!bucket || !DomainRules.FLASHCARD.BUCKETS.includes(bucket)) throw new InvalidBucketValueError()
    this.bucket = bucket;
  }

  validateAndSetTexts(args: { front: string, back: string}) {
    const { front, back } = args;
    [front, back].forEach(text => {
      if(text.length >= DomainRules.FLASHCARD.TEXT.MAX_LENGTH ||
        text.length <= DomainRules.FLASHCARD.TEXT.MIN_LENGTH) {
          throw new InvalidFlashcardTextLengthError()
        }
    });
    this.front = front;
    this.back = back;
  }

  setNextDue() {
    this.nextDue = new Date(new Date().valueOf() + 24*60*60*1000*Math.pow(2,this.bucket-1)).valueOf();
  }

  move() {
    this.setNextDue();
    this.bucket += 1;
  }

  reset() {
    this.bucket = 1;
    this.setNextDue()
  }

}
