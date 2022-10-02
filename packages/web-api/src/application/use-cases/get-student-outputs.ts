import {
    StudentOutputDTO,
    ActivityDTO,
    IActivityRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    cursor: number,
    studentId?: string;
  };
  type Return = (Partial<StudentOutputDTO> & Partial<ActivityDTO>)[];
  
  export type IGetStudentOutputsUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGetStudentOutputsUseCase {
  
    constructor(
      private activityRepository: IActivityRepository
    ){}
  
    async execute ({ studentId, cursor }) {
      
      return this.activityRepository.getStudentOutputsByStudentId(studentId);
    }
  
  };
  
  export default UseCase;
  