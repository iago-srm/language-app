import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR
} from '.';

export interface IActivityRepository {
  getActivitiesByInstructorIdOrAll: (
    cursor: number,
    instructorId?: string,
    title?: string,
    cefr?: CEFR,
  ) => Promise<Partial<ActivityDTO>[]>;
  getActivityById: (id: number) => Promise<ActivityDTO>;
  insertActivity: (activity: ActivityDTO) => Promise<Partial<ActivityDTO>>;
  insertNewInstructions: (activityId: number, instructions: ActivityInstructionDTO[]) => Promise<Partial<ActivityDTO>>;
}
