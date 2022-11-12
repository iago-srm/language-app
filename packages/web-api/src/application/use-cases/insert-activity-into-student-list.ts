import { IActivityRepository, IStudentRepository } from "../ports";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  userId: string;
  activityId: number;
};
type Return = void;

export type IInsertActivityIntoStudentListUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements IInsertActivityIntoStudentListUseCase {
  constructor(
    private activityRepository: IActivityRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute({ userId, activityId }: InputParams) {
    const student = await this.studentRepository.getStudentByUserId(userId);
    const activity = await this.activityRepository.getActivityById(activityId);

    if (!activity) {
      throw new Error("Activity not found");
    }

    if (!student) {
      throw new Error("Student not found");
    }

    const studentList =
      await this.activityRepository.getStudentListActivityIdsByStudentId(
        student.id
      );
    if (studentList.includes(activityId)) return; // Idempotency. Or perhaps HTTP 304 would be more appropriate?

    await this.activityRepository.insertActivityIntoStudentList(
      student.id,
      activityId
    );
  }
}

export default UseCase;
