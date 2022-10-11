import {
  ActivityDTO,
  IActivityRepository,
  IStudentRepository,
  IInstructorRepository
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';
import { DomainRules } from '@language-app/common-core';

type InputParams = {
  userId: string;
  cursor?: number;
  title?: string;
  cefr?: string;
  topics?: string[],
  contentTypes?: string,
  isMyList?: boolean;
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

  async execute ({ cursor, title, cefr, topics, contentTypes, isMyList, userId, thisInstructorOnly }) {

    // console.log({
    //   cursor, title, cefr, topics, contentTypes, isInProgress, isComplete, thisInstructorOnly
    // });

    let instructorId;

    if(thisInstructorOnly) {
      // console.log("filtering by instructor author");
      instructorId = (await this.instructorRepository.getInstructorByUserId(userId)).id;        
    }

    let studentActivitiesIds;

    if(isMyList) {
      const student = await this.studentRepository.getStudentByUserId(userId);

      if(student) {
        const incompleteActivitiesIds = await this.activityRepository.getActivityIdsByStudentList(student.id);
        studentActivitiesIds = incompleteActivitiesIds;
      }
      
    }


    // console.log({studentActivitiesIds}, studentActivitiesIds.length)
    const activities = await this.activityRepository.getActivities({
      instructorId,
      cursor,
      title,
      cefr,
      topics: topics || DomainRules.ACTIVITY.TOPICS,
      contentTypes: contentTypes || DomainRules.ACTIVITY.CONTENTTYPE,
      ids: studentActivitiesIds 
    });

    return {
      activities,
      cursor: activities[activities.length - 1]?.id || undefined
    }
  }

};

export default UseCase;
