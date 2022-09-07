import {
  ActivityDTO,
  IActivityRepository,
  IInstructorRepository
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  userId: string;
  cursor?: number;
  title?: string;
  cefr?: string
};
type Return = { cursor: number, activities: Partial<ActivityDTO>[] };

export type IGetInstructorActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetInstructorActivitiesUseCase {

  // get instructor from userId
  // get all activities from him
  //show few fields
  constructor(
    private instructorRepository: IInstructorRepository,
    private activityRepository: IActivityRepository
  ){}

  async execute ({ userId, cursor, title, cefr }) {

    const instructor = await this.instructorRepository.getInstructorByUserId(userId);
    
    const activities = await this.activityRepository.getActivities({
      instructorId: instructor.id,
      cursor,
      title,
      cefr
    });

    return {
      activities,
      cursor: activities[activities.length - 1].id
    }
  }

};

export default UseCase;
