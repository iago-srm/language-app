import {
  ActivityDTO,
  IActivityRepository,
  IStudentRepository
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';
import { DomainRules } from '@/../../common-core';

type InputParams = {
  userId: string;
  cursor?: number;
  title?: string;
  cefr?: string;
  topics?: string[],
  contentType?: string,
  isInProgress?: boolean,
  isComplete?: boolean,
};
type Return = { cursor: number, activities: Partial<ActivityDTO>[] };

export type IGetStudentActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetStudentActivitiesUseCase {

  // get all activities based on filters
  // show few fields
  constructor(
    private studentRepository: IStudentRepository, 
    private activityRepository: IActivityRepository
  ){}

  async execute ({ cursor, title, cefr, topics, contentType, isInProgress, isComplete, userId }) {

    console.log({
      cursor, title, cefr, topics, contentType, isInProgress, isComplete
    });

    const student = await this.studentRepository.getStudentByUserId(userId);

    let studentActivitiesIds;

    if(isInProgress) {
      const incompleteActivitiesIds = await this.activityRepository.getActivitiesByStudentProgress(student.id, false);
      studentActivitiesIds = incompleteActivitiesIds;
    }
    console.log({studentActivitiesIds})
    if(isComplete) {
      const completeActivitiesIds = await this.activityRepository.getActivitiesByStudentProgress(student.id, true);
      if(studentActivitiesIds?.length) {
        studentActivitiesIds.push(...completeActivitiesIds);
      } else {
        studentActivitiesIds = completeActivitiesIds;
      }
    }

    // console.log({studentActivitiesIds}, studentActivitiesIds.length)
    const activities = await this.activityRepository.getActivities({
      cursor,
      title,
      cefr,
      topics: topics || DomainRules.ACTIVITY.TOPICS,
      contentType,
      ids: studentActivitiesIds 
    });

    return {
      activities,
      cursor: activities[activities.length - 1]?.id || undefined
    }
  }

};

export default UseCase;
