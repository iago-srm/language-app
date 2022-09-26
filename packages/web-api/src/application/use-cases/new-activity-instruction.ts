import {
    ActivityInstructionDTO, ActivityDTO, IActivityRepository, IInstructorRepository,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
import { ActivityInstruction } from '@domain';
  
  type InputParams = {
    userId:string,
    activityId: number,
    instructions: ActivityInstructionDTO[];
  }
  // type Return = Partial<ActivityInstructionDTO>[];
  type Return = void;
  
  export type INewActivityInstructionUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewActivityInstructionUseCase {
  
    constructor(
      private activityRepository: IActivityRepository,
      private instructorRepository: IInstructorRepository
    ){}
  
    async execute ({ userId, activityId, instructions }) {
      const activityDTO = await this.activityRepository.getActivityById(activityId);
      const instructorDTO = await this.instructorRepository.getInstructorByUserId(userId);

      if(activityDTO.instructorId !== instructorDTO.id) {
        throw new Error("You can only alter activities that belong to you")
      }

      instructions.forEach(instruction => new ActivityInstruction({...instruction}));

      // return this.activityRepository.insertNewInstructions(activityId,instructions)
    }
  
  };
  
  export default UseCase;
  