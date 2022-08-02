
interface ActivityInstructionAnswerConstructorParams {
  answer: string;
}

export class ActivityInstructionAnswer {
  answer: string;

  constructor(args: Partial<ActivityInstructionAnswerConstructorParams>) {
    args.answer && this.setAnswer(args.answer);
  }


  setAnswer(text: string) {
    this.answer = text;
  }
}
