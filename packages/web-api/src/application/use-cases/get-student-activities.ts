import {
  ActivityDTO,
  IActivityRepository
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  cursor?: number;
  title?: string;
  cefr?: string
};
type Return = { cursor: number, activities: Partial<ActivityDTO>[] };

export type IGetStudentActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetStudentActivitiesUseCase {

  // get all activities based on filters
  // show few fields
  constructor(
    private activityRepository: IActivityRepository
  ){}

  async execute ({ cursor, title, cefr }) {

    const activities = await this.activityRepository.getActivities({
      cursor,
      title,
      cefr
    });

    return {
      activities,
      cursor: activities[activities.length - 1]?.id || undefined
    }
  }

};

export default UseCase;
