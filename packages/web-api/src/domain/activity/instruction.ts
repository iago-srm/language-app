import { DomainRules } from "@language-app/common-core";
import {
  InvalidInstructionOptionSetError,
  InvalidActivityInstructionLengthError,
  InvalidActivityOptionLengthError,
} from "../errors";

interface Option {
  text: string;
  id: string;
}

interface ActivityInstructionConstructorParams {
  optionsAnswers: string[];
  textAnswer: string;
  text: string;
  options?: Option[];
  type: string;
}

export class ActivityInstruction {
  optionsAnswers: string[];
  textAnswer: string;
  text: string;
  options?: Option[] = [];

  constructor(args: Partial<ActivityInstructionConstructorParams>) {
    args.text && this.setInstructionText(args.text);
    this.parseOptions(
      args.options,
      args.optionsAnswers,
      args.textAnswer,
      args.type
    );
  }

  setInstructionText(text: string) {
    if (
      text.length < DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH ||
      text.length > DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH
    ) {
      throw new InvalidActivityInstructionLengthError({
        text,
      });
    }
    this.text = text;
  }

  parseOptions(
    options: Option[],
    optionsAnswers: string[],
    textAnswer: string,
    instructionType: string
  ) {
    // if(!Array.isArray(options) || !options.length) throw new Error("\"options\" parameter must be a non-empty array")
    if (instructionType === "OPTIONS") {
      if (!optionsAnswers)
        throw new Error("Options instruction type but no correct answer");
      for (let option of options) {
        if (
          option.text.length < DomainRules.ACTIVITY.OPTION.MIN_LENGTH ||
          option.text.length > DomainRules.ACTIVITY.OPTION.MAX_LENGTH
        ) {
          throw new InvalidActivityOptionLengthError({
            text: option.text,
          });
        }
      }
      const optionIds = options.map((opt) => opt.id);
      for (let answer of optionsAnswers) {
        if (!optionIds.includes(answer))
          throw new InvalidInstructionOptionSetError({ text: answer });
      }
    }
    this.options = options;
    this.optionsAnswers = optionsAnswers;
    this.textAnswer = textAnswer;
  }
}
