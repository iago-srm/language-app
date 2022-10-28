import {
  IAssociationInvitationRepository,
  IStudentRepository
} from '../ports';
import {
  UserNotFoundError,
} from '@common/errors';
import {
  IVerifyAccountParams,
} from '@language-app/common-core';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  token: string,
  userId: string
};
type Return = void;

export type IAcceptAssociationInvitationUseCase = IUseCase<InputParams, Return>;

class UseCase implements IAcceptAssociationInvitationUseCase {
  constructor (
    private studentRepository: IStudentRepository,
    private associationInvitationTokenRepository: IAssociationInvitationRepository
  ){}
  async execute({ token, userId }) {

    const invitationToken = await this.associationInvitationTokenRepository.getTokenByTokenValue(token);
    if (!invitationToken) throw new Error("Invitation token not found");

    const student = await this.studentRepository.getStudentByUserId(userId);
    if (!student) throw new Error("There is no student associated to this authorization token");

    if(invitationToken.studentId !== student.id) {
      throw new Error("This invitation does not belong to this user");
    }
    await this.associationInvitationTokenRepository.updateToken(invitationToken.id, {
      accepted: true
    });

    await this.studentRepository.assignInstructor(student.id, invitationToken.instructorId);
  }

}

export default UseCase;
