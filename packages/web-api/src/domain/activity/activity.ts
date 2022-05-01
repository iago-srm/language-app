import { Cefr, ActivityVersion, ActivityContent, Instructor } from '..';
import { DomainRules } from '@language-app/common';
import {
  InvalidActivityTimeToCompleteError,
  InvalidActivityTopicError,
} from '../errors';

interface ActivityConstructorParams {
  topic: string;
  timeToComplete: number;
}

export class Activity {
  instructor: Instructor;
  latestVersion: ActivityVersion;
  versions: ActivityVersion[];
  cefr: Cefr;
  timeToComplete: number;
  topic: string;
  status: string;
  content: ActivityContent;

  constructor(args: ActivityConstructorParams) {
    this.setTopic(args.topic);
    this.setTimeToComplete(args.timeToComplete);
    this.status = 'PENDING';
  }

  setTopic(topic: string) {
    if (!DomainRules.ACTIVITY.TOPICS.includes(topic))
      throw new InvalidActivityTopicError({ text: topic });
    this.topic = topic;
  }

  setTimeToComplete(timeToComplete: number) {
    if (timeToComplete > DomainRules.ACTIVITY.MAX_TIME_TO_COMPLETE)
      throw new InvalidActivityTimeToCompleteError();
    this.timeToComplete = timeToComplete;
  }
}
