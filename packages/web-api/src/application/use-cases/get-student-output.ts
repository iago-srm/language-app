import {
    StudentOutputDTO,
    IActivityRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    studentOutputId: string;
  };
  type Return = StudentOutputDTO;
  
  export type IGetStudentOutputUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGetStudentOutputUseCase {
  
    constructor(
      private activityRepository: IActivityRepository
    ){}
  
    async execute ({ studentOutputId }) {
      return this.activityRepository.getStudentOutputById(studentOutputId);
    }
  
  };
  
  export default UseCase;
  