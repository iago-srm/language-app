import { Cefr } from '.';
import { DomainRules } from '@language-app/common';
import { ErrorMessages } from '@common/locales';

describe("Unit Tests for Cefr Entity", () => {
  it("Should throw if invalid CEFR value is passed.", () => {
    try {
      new Cefr({ value: 'C3' });
    } catch(e) {
      expect(e).toMatchObject({ errorName: ErrorMessages.CEFR, params: {
        possibleValues: DomainRules.CEFR.POSSIBLE_VALUES
      } })
    }
  });


  DomainRules.CEFR.POSSIBLE_VALUES.map(cefr => it("Should not throw if valid CEFR value is passed.", () => {
    expect(() => {
      new Cefr({ value: cefr })
    }).not.toThrow()
  }))
})
