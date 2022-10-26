import {
    IStudentRepository,
    IAssociationInvitationRepository,
    IInvitationEmailService,
    IIdGenerator,
    IInstructorRepository,
  } from '../ports';
  import {
    UserNotFoundError,
  } from '@common/errors';
  import {
    IForgotPasswordParams,
    IForgotPasswordResponse,
  } from '@language-app/common-core';
  import { IUseCase } from '@language-app/common-platform';
  
  type InputParams = {
    language: string;
    userId: string;
    studentEmail: string;
  };
  type Return = void;
  
  export type INewAssociationInvitationUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewAssociationInvitationUseCase {
  
    constructor (
      private studentRepository: IStudentRepository,
      private associationInvitationTokenRepository: IAssociationInvitationRepository,
      private invitationEmailService: IInvitationEmailService,
      private idService: IIdGenerator,
      private instructorRepository: IInstructorRepository
    ){}
  
    async execute({ userId, studentEmail, language }) {
  
      const student = await this.studentRepository.getStudentByUserEmail(studentEmail);
      if(!student) throw new UserNotFoundError();
  
      const instructor = await this.instructorRepository.getInstructorByUserId(userId);
      if(!instructor) throw new UserNotFoundError();

      const token = this.idService.getId();
  
      const existingInvitation = await this.associationInvitationTokenRepository.getTokenByStudentAndInstructorIds(instructor.id, student.id);
      if(existingInvitation) throw new Error ("An invitation to this student has already been sent by you.");

      //TODO: allow student to dissociate from current instructor
      const otherInvitationToThisStudent = await this.associationInvitationTokenRepository.getTokenByStudentId(student.id);
      if(otherInvitationToThisStudent && otherInvitationToThisStudent.accepted) throw new Error("This student is already associated to another instructor. Please ask them to remove that association.");

      await this.associationInvitationTokenRepository.insertToken({
        token,
        studentId: student.id,
        instructorId: instructor.id,
        accepted: false
      });
  
      await this.invitationEmailService.sendInvitationEmailToStudent({
        destination: studentEmail,
        language,
        url: `${process.env.WEB_APP_URL}/accept-association-invitation/${token}`,
        instructorName: instructor.user.name
      });
  
    }
  
  }
  
  export default UseCase;
  