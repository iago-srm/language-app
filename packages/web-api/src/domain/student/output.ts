import { DomainRules } from '@language-app/common';
import { InvalidStudentOutputStatusError } from '../errors';

interface StudentOutputConstructorParams {
  status: string;
}

export class StudentOutput {
  status: string;

  constructor(args: StudentOutputConstructorParams) {
    this.setStatus(args.status);
  }

  setStatus(status: string) {
    if (!DomainRules.STUDENT_OUTPUT.STATUS.includes(status))
      throw new InvalidStudentOutputStatusError();
    this.status = status;
  }
}
