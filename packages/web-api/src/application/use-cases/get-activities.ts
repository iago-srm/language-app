import {
  ActivityDTO,
  IActivityRepository,
  IStudentRepository,
  IInstructorRepository
} from '../ports';
import {
  IPaginatedParams,
  IPaginatedResponse,
  IUseCase
} from '@language-app/common-platform';
import { DomainRules } from '@language-app/common-core';

interface InputParams extends IPaginatedParams {
  userId: string;
  title?: string;
  cefr?: string;
  topics?: string[],
  contentTypes?: string,
  isMyList?: boolean;
  thisInstructorOnly: boolean
};
interface Return extends IPaginatedResponse<Partial<ActivityDTO>> {}

export type IGetActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivitiesUseCase {

  constructor(
    private studentRepository: IStudentRepository, 
    private instructorRepository: IInstructorRepository,
    private activityRepository: IActivityRepository
  ){}

  async execute ({ 
    cursor, 
    pageSize,
    title, 
    cefr, 
    topics, 
    contentTypes, 
    isMyList, 
    userId, 
    thisInstructorOnly 
  }) {

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

    const activities = await this.activityRepository.getActivities({
      instructorId,
      cursor,
      pageSize,
      title,
      cefr,
      topics: topics || DomainRules.ACTIVITY.TOPICS,
      contentTypes: contentTypes || DomainRules.ACTIVITY.CONTENTTYPE,
      ids: studentActivitiesIds 
    });

    return {
      data: activities,
      cursor: activities[activities.length - 1]?.id || undefined
    }
  }

};

export default UseCase;
