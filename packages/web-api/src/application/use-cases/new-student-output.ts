import {
    StudentOutputDTO,
    IActivityRepository,
    IStudentRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    outputs: StudentOutputDTO;
    userId: string;
    activityId: number;
  }
  type Return = Partial<StudentOutputDTO>;
  // type Return = void;
  
  export type INewStudentOutputUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewStudentOutputUseCase {
  
    constructor(
      private activityRepository: IActivityRepository,
      private studentRepository: IStudentRepository,
    ){}
  
    async execute ({ userId, outputs, activityId }) {
      // console.log({userId, outputs, activityId})
      // TODO: the necessary verifications

      const student = await this.studentRepository.getStudentByUserId(userId);

      return this.activityRepository.insertStudentOutput({
        activityId,
        studentId: student.id,
        outputs
      })
    }
  
  };
  
  export default UseCase;
  