import {
    StudentOutputDTO,
    ActivityDTO,
    IStudentOutputRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common';
  
  type InputParams = {
    cursor: number,
    studentId?: string;
  };
  type Return = (Partial<StudentOutputDTO> & Partial<ActivityDTO>)[];
  
  export type IGetStudentOutputsUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGetStudentOutputsUseCase {
  
    constructor(
      private studentOutputRepository: IStudentOutputRepository
    ){}
  
    async execute ({ studentId, cursor }) {
      
      return this.studentOutputRepository.getStudentOutputsByStudentId(studentId);
    }
  
  };
  
  export default UseCase;
  