import { DomainRules } from '@language-app/common';
import {
  InvalidActivityTypeError,
  InvalidVideoUrlError,
  InvalidVideoTimesError,
  InvalidVideoLengthError,
  InvalidTextLengthError
} from '../errors';

type Validators = {[key: string]: { validate: (url: string) => boolean }};
interface ActivityContentConstructorParams {
  type: string
  validators?: Validators;
  videoUrl?: string;
  startTime?: number;
  endTime?: number;
  text?: string;
}

export class ActivityContent {
  type: string
  videoUrl?: string;
  validators: Validators
  startTime?: number;
  endTime?: number;
  text?: string;

  constructor(args: ActivityContentConstructorParams) {
    this.validateAndSetType(args.type);
    this.validators = args.validators;
    this.validateAndSetUrl(args.videoUrl);
    this.validateAndSetTimes(args.startTime,args.endTime);
  }

  validateAndSetType(type: string) {
    if(!DomainRules.ACTIVITY.TYPES.ALL.includes(type)) throw new InvalidActivityTypeError({ type });
    this.type = type;
  }

  validateAndSetUrl(url: string) {
    if(!url || !this.validators) return;
    if(DomainRules.ACTIVITY.TYPES.ALL.includes(this.type)) {
      if(!this.validators[this.type].validate(url)) throw new InvalidVideoUrlError();
    }
    this.videoUrl = url;
  }

  validateAndSetTimes(start: number, end: number) {
    if(!start || !end) return;
    if(start > end) throw new InvalidVideoTimesError();
    if(end - start > DomainRules.ACTIVITY.MAX_VIDEO_LENGTH) throw new InvalidVideoLengthError()
    this.startTime = start;
    this.endTime = end;
  }

  validateAndSetText(text: string) {
    if(!text) return;
    if(text.length > DomainRules.ACTIVITY.MAX_TEXT_LENGTH) throw new InvalidTextLengthError();
    this.text = text;
  }
}
