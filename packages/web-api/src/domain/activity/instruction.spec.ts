import { ActivityInstruction } from './instruction';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';
import { ActivityOption } from './option';

describe("Unit Tests for ActivityInstruction Entity", () => {

  it("Should not throw an error if valid parameters are passed to constructor.", () => {
    expect(() => {
      new ActivityInstruction({ text: 'a'.repeat(DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH), isCheckbox: true });
      new ActivityInstruction({ text: 'a'.repeat(DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH), isCheckbox: false })
    }).not.toThrow()
  });

  it("Should throw na error if invalid parameters are passed to constructor.", () => {
    try {
      new ActivityInstruction({ text: 'a'.repeat(DomainRules.ACTIVITY.INSTRUCTION.MIN_LENGTH - 1), isCheckbox: true });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_INSTRUCTION_LENGTH})
    }
    try {
      new ActivityInstruction({ text: 'a'.repeat(DomainRules.ACTIVITY.INSTRUCTION.MAX_LENGTH + 1), isCheckbox: true })
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_INSTRUCTION_LENGTH})
    }
  })

  it("Should throw an error if more than one true option is passed to radio instruction 1/2.", () => {

    const options = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
    ]

    const instruction = new ActivityInstruction({
      text: 'fsneivvknrje',
      isCheckbox: false
    });

    try {
      instruction.addOptions(options)
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_INSTRUCTION_INVALID_OPTION_SET})
    }
  })

  it("Should throw an error if more than one true option is passed to radio instruction 2/2.", () => {

    const options = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
    ]

    const instruction = new ActivityInstruction({
      text: 'fsneivvknrje',
      isCheckbox: false
    });

    try {
      instruction.addOptions(options)
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_INSTRUCTION_INVALID_OPTION_SET})
    }
  })

  it("Should throw an error if no correct option is passed to radio instruction.", () => {

    const options = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
    ]

    const instruction = new ActivityInstruction({
      text: 'fsneivvknrje',
      isCheckbox: false
    });

    try {
      instruction.addOptions(options)
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.ACTIVITY_INSTRUCTION_INVALID_OPTION_SET})
    }
  })

  it("Should not throw an error if valid option set is passed to addOptions method.", () => {
    const options = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
    ]

    const instruction = new ActivityInstruction({
      text: 'fsneivvknrje',
      isCheckbox: false
    });

    expect(() => instruction.addOptions(options)).not.toThrow();
  })

  it("Should allow for checkbox instructions to have none, many or all correct options", () => {

    const instruction = new ActivityInstruction({
      text: 'fsneivvknrje',
      isCheckbox: true
    });

    const noneAreCorrect = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
    ]

    expect(() => instruction.addOptions(noneAreCorrect)).not.toThrow();

    const oneIsCorrect = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: false}),
    ]

    expect(() => instruction.addOptions(oneIsCorrect)).not.toThrow();

    const allAreCorrect = [
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
      new ActivityOption({ text: 'nosnsidunceib', isCorrect: true}),
    ]

    expect(() => instruction.addOptions(allAreCorrect)).not.toThrow();
  })
})
