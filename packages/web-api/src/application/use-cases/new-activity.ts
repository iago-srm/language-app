import {
    ActivityDTO, IActivityRepository,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common';
  
  type InputParams = {
    activity: ActivityDTO;
  }
  type Return = ActivityDTO;
  
  export type INewActivityUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements INewActivityUseCase {
  
    constructor(
      private activityRepository: IActivityRepository
    ){}
  
    async execute ({ activity }) {
  
      console.log({activity})
      return this.activityRepository.insertActivity(activity);
    }
  
  };
  
  export default UseCase;
  