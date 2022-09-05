import {
    ActivityDTO, IActivityRepository, IInstructorRepository,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
import { Activity, ActivityInstruction } from '@domain';
  
  type InputParams = {
    userId: string;
    activity: ActivityDTO;
  }
  type Return = ActivityDTO;
  
  export type INewActivityUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewActivityUseCase {
  
    constructor(
      private activityRepository: IActivityRepository,
      private instructorRepository: IInstructorRepository
    ){}
  
    async execute ({ userId, activity }) {

      activity.instructions.forEach(instruction => new ActivityInstruction({...instruction}))
      new Activity({...activity});
      
      const instructor = await this.instructorRepository.getInstructorByUserId(userId);
      if(!instructor) throw new Error("Instructor not found");
      
      return this.activityRepository.insertActivity(instructor.id, {
        ...activity,
        timeToComplete: Number(activity.timeToComplete)
      });
    }
  
  };
  
  export default UseCase;
  