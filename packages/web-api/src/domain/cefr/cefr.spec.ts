import { Cefr } from './index';
import { DomainRules } from '@language-app/common';

describe("Unit Tests for Cefr Entity", () => {
  it("Should throw if invalid CEFR value is passed.", () => {
    try {
      new Cefr({ value: 'C3' });
    } catch(e) {
      expect(e).toMatchObject({ errorName: 'invalid_cefr', params: {
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
