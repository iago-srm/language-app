import {
    StudentOutputDTO,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common';
  
  type InputParams = {
    output: StudentOutputDTO;
  }
  // type Return = StudentOutputDTO;
  type Return = void;
  
  export type INewStudentOutputUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewStudentOutputUseCase {
  
    constructor(
    ){}
  
    async execute ({ output }) {
      console.log({output})
  
      return 
    }
  
  };
  
  export default UseCase;
  