import { DomainRules } from "@language-app/common-core";
import { InvalidGradeError, InvalidFeedbackMessageError } from "../errors";

interface FeedbackConstructorParams {
  grade: number;
  message: string;
}

export class Feedback {
  grade: number;
  message: string;

  constructor(args: Partial<FeedbackConstructorParams>) {
    args.grade && this.setGrade(args.grade);
    args.message && this.setMessage(args.message);
  }

  setGrade(grade: number) {
    if (isNaN(Number(grade)) || !DomainRules.FEEDBACK.GRADES.includes(grade))
      throw new InvalidGradeError();
    this.grade = grade;
  }

  setMessage(message: string) {
    if (message.length > DomainRules.FEEDBACK.MAX_LENGTH)
      throw new InvalidFeedbackMessageError();
    this.message = message;
  }
}
