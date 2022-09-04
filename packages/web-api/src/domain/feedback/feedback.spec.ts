import { Feedback } from '@domain';
import { DomainRules } from '@language-app/common-core';
import { ErrorMessagesLabels } from '@common/locale';

describe('Unit Tests for FeedbackToActivity Entity', () => {
  it('Should throw an error if and invalid grade is passed', () => {
    try {
      new Feedback({ grade: 10, message: 'ok' });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessagesLabels.FEEDBACK_GRADE });
    }
  });

  it('Should throw an error if too long of a message is passed', () => {
    try {
      new Feedback({
        grade: DomainRules.FEEDBACK.GRADES[0],
        message: 'k'.repeat(DomainRules.FEEDBACK.MAX_LENGTH + 1),
      });
    } catch (e) {
      expect(e).toMatchObject({ errorName: ErrorMessagesLabels.FEEDBACK_MESSAGE });
    }
  });

  it('Should not throw errors and set values if valid values are passed', () => {
    const feedback = new Feedback({
      grade: DomainRules.FEEDBACK.GRADES[0],
      message: 'ok',
    });
    expect(feedback.grade).toEqual(DomainRules.FEEDBACK.GRADES[0]);
    expect(feedback.message).toEqual('ok');
  });
});
