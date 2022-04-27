import { DomainRules } from '@language-app/common';
import {
  InvalidBucketValueError,
  InvalidFlashcardTextLengthError
} from './errors';

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
    if(args.bucket) this.validateBucket(args.bucket);
    if(args.front && args.back) this.validateTexts([args.front, args.back]);
    this.bucket = args.bucket;
  }

  validateBucket(bucket: number) {
    if(!bucket || !DomainRules.FLASHCARD.BUCKETS.includes(bucket)) {
      throw new InvalidBucketValueError()
    }
  }

  validateTexts(texts: string[]) {
    texts.forEach(text => {
      if(text.length > DomainRules.FLASHCARD.TEXT.MAX_LENGTH ||
        text.length < DomainRules.FLASHCARD.TEXT.MIN_LENGTH) {
          throw new InvalidFlashcardTextLengthError()
        }
    })
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
