import {
  ActivityDTO,
  IActivityRepository
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  instructorId: string;
  cursor?: number;
  title?: string;
  cefr?: string
};
type Return = ActivityDTO[];

export type IGetInstructorActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetInstructorActivitiesUseCase {

  constructor(
    private activityRepository: IActivityRepository
  ){}

  async execute ({ }) {


    return []
  }

};

export default UseCase;
