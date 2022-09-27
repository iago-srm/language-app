import {
  ActivityDTO,
  IActivityRepository,
  IStudentRepository,
  IInstructorRepository
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
  thisInstructorOnly: boolean
};
type Return = { cursor: number, activities: Partial<ActivityDTO>[] };

export type IGetActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivitiesUseCase {

  constructor(
    private studentRepository: IStudentRepository, 
    private instructorRepository: IInstructorRepository,
    private activityRepository: IActivityRepository
  ){}

  async execute ({ cursor, title, cefr, topics, contentType, isInProgress, isComplete, userId, thisInstructorOnly }) {

    console.log({
      cursor, title, cefr, topics, contentType, isInProgress, isComplete, thisInstructorOnly
    });

    let instructorId;

    if(thisInstructorOnly) {
      instructorId = (await this.instructorRepository.getInstructorByUserId(userId)).id;
    }

    // starts undefined so that, if nor isInProgress nor isComplete are applied, there is no restriction on ids.
    let studentActivitiesIds;

    if(isInProgress || isComplete) {
      const student = await this.studentRepository.getStudentByUserId(userId);

      if(isInProgress) {
        const incompleteActivitiesIds = await this.activityRepository.getActivityIdsByStudentProgress(student.id, false);
        studentActivitiesIds = incompleteActivitiesIds;
      }
  
      if(isComplete) {
        const completeActivitiesIds = await this.activityRepository.getActivityIdsByStudentProgress(student.id, true);
        if(studentActivitiesIds?.length) {
          studentActivitiesIds.push(...completeActivitiesIds);
        } else {
          studentActivitiesIds = completeActivitiesIds;
        }
      }
    }


    // console.log({studentActivitiesIds}, studentActivitiesIds.length)
    const activities = await this.activityRepository.getActivities({
      instructorId,
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
