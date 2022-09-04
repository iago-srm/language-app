import {
    ActivityInstructionDTO,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    instruction: ActivityInstructionDTO;
  }
  // type Return = ActivityInstructionDTO;
  type Return = void;
  
  export type INewActivityInstructionUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewActivityInstructionUseCase {
  
    constructor(
    ){}
  
    async execute ({ instruction }) {
  
      console.log({instruction})
      return 
    }
  
  };
  
  export default UseCase;
  