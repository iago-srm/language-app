import { ErrorMessages } from '@common/locales';
import { DomainRules } from '@language-app/common';
import { StudentOutput } from '@domain';

describe('Unit Tests for StudentOutput entity', () => {
  it('Should throw an error if invalid status value is passed to constructor', () => {
    try {
      new StudentOutput({ status: 'fdsfec' });
    } catch (e) {
      expect(e).toMatchObject({
        errorName: ErrorMessages.STUDENT_OUTPUT_FEEDBACK_STATUS,
      });
    }
  });

  DomainRules.STUDENT_OUTPUT.STATUS.map((status) =>
    it('Should not throw an error and should set statu correctly when valid value is passed', () => {
      const sut = new StudentOutput({ status });
      expect(sut.status).toEqual(status);
    })
  );
});
