import {
    IActivityRepository, IStudentRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    userId: string;
    activityId: number;
    completed: boolean;
  }
  type Return = void;
  
  export type IChangeActivityProgressStatusUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IChangeActivityProgressStatusUseCase {
  
    constructor(
      private activityRepository: IActivityRepository,
      private studentRepository: IStudentRepository
    ){}
  
    async execute ({ userId, activityId, completed }) {
        const student = await this.studentRepository.getStudentByUserId(userId);

        if(!student) {
            throw new Error("Student not found");
        }

        await this.activityRepository.insertActivityProgress(student.id, activityId, completed);
    }
  
  };
  
  export default UseCase;
  