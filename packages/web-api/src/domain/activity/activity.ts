import { Instructor } from "..";
import { DomainRules } from "@language-app/common-core";
import {
  InvalidActivityTimeToCompleteError,
  InvalidActivityTopicError,
  InvalidActivityTypeError,
  InvalidActivityTitleLengthError,
  InvalidActivityDescriptionLengthError,
  InvalidVideoTimesError,
  InvalidVideoLengthError,
  InvalidCEFRError,
} from "../errors";
import { contentValidator } from "../helpers";

interface ActivityConstructorParams {
  topics: string[];
  // timeToComplete: number;
  contentType: string;
  startTime: number;
  endTime: number;
  content: string;
  title: string;
  description: string;
  cefr: string;
}

export class Activity {
  instructor: Instructor;
  lastVersion: number;
  cefr: string;
  timeToComplete: number;
  topics: string[];
  contentType: string;
  startTime?: number;
  endTime?: number;
  content: string;
  title: string;
  description: string;

  constructor(args: Partial<ActivityConstructorParams>) {
    args.topics && this.setTopic(args.topics);
    // args.timeToComplete && this.setTimeToComplete(args.timeToComplete);
    args.contentType && this.setContentType(args.contentType);
    args.content && this.setContent(args.content);
    this.setTimes(args.startTime, args.endTime);
    args.title && this.setTitle(args.title);
    args.description && this.setDescription(args.description);
    args.cefr && this.setCefr(args.cefr);
  }

  setTopic(topics: string[]) {
    for (let topic of topics) {
      if (!DomainRules.ACTIVITY.TOPICS.includes(topic))
        throw new InvalidActivityTopicError({ text: topic });
    }
    this.topics = topics;
  }

  // setTimeToComplete(timeToComplete: number) {
  //   if(isNaN(timeToComplete)) throw new InvalidActivityTimeToCompleteError();
  //   if (timeToComplete > DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE
  //     || timeToComplete < DomainRules.ACTIVITY.MIN_TIME_TO_COMPLETE)
  //     throw new InvalidActivityTimeToCompleteError();
  //   this.timeToComplete = timeToComplete;
  // }

  setContentType(contentType: string) {
    if (!DomainRules.ACTIVITY.CONTENTTYPE.includes(contentType))
      throw new InvalidActivityTypeError({ text: contentType });
    this.contentType = contentType;
  }

  setContent(content: string) {
    contentValidator[this.contentType](content);
    this.content = content;
  }

  setTimes(start: number, end: number) {
    if (start === undefined || end === undefined) return; // can't do !start because it can be zero
    if (start > end) throw new InvalidVideoTimesError();
    if (end - start > DomainRules.ACTIVITY.MAX_VIDEO_LENGTH)
      throw new InvalidVideoLengthError();
    this.startTime = start;
    this.endTime = end;
  }

  setTitle(text) {
    if (
      text.length < DomainRules.ACTIVITY.TITLE.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.TITLE.MAX_LENGTH
    ) {
      throw new InvalidActivityTitleLengthError({
        text,
      });
    }
    this.title = text;
  }

  setDescription(text) {
    if (
      text.length < DomainRules.ACTIVITY.DESCRIPTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.DESCRIPTION.MAX_LENGTH
    ) {
      throw new InvalidActivityDescriptionLengthError({
        text,
      });
    }
    this.description = text;
  }

  setCefr(value: string) {
    if (!DomainRules.CEFR.POSSIBLE_VALUES.includes(value))
      throw new InvalidCEFRError({ text: value });
    this.cefr = value;
  }
}
