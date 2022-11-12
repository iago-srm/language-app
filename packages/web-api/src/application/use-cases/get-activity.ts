import { ActivityDTO, IActivityRepository, IStudentRepository } from "../ports";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  activityId: number;
  userId: string;
  role: string;
};
type Return = { activity: Partial<ActivityDTO> };

export type IGetActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityUseCase {
  constructor(
    private studentRepository: IStudentRepository,
    private activityRepository: IActivityRepository
  ) {}

  async execute({ activityId, userId, role }) {
    const activity = await this.activityRepository.getActivityById(activityId);

    if (!activity) throw new Error("Activity not found");

    if (role === "STUDENT") {
      const student = await this.studentRepository.getStudentByUserId(userId);
      const studentActivitiesList =
        await this.activityRepository.getStudentListActivityIdsByStudentId(
          student.id
        );
      if (studentActivitiesList.includes(activityId)) {
        return {
          activity: {
            ...activity,
            isMyList: true,
          },
        };
      }
    }
    return {
      activity: {
        ...activity,
        isMyList: false,
      },
    };
  }
}

export default UseCase;
