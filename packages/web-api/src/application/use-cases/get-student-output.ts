import {
    StudentOutputDTO,
    IStudentOutputRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common';
  
  type InputParams = {
    studentOutputId?: string;
    studentId?: string;
  };
  type Return = StudentOutputDTO[] | StudentOutputDTO;
  
  export type IGetStudentOutputsUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGetStudentOutputsUseCase {
  
    constructor(
      private studentOutputRepository: IStudentOutputRepository
    ){}
  
    async execute ({ studentId, studentOutputId }) {
      
      let result: StudentOutputDTO[] | StudentOutputDTO;

      if(studentId) {
        result = await this.studentOutputRepository.getStudentOutputsByStudentId(studentId);
      } else if (studentOutputId) {
        result = await this.studentOutputRepository.getStudentOutputById(studentOutputId);
      }
  
      return result;
    }
  
  };
  
  export default UseCase;
  