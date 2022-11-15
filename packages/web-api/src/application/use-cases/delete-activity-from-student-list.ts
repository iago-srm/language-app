import { IActivityRepository, IStudentRepository } from "../ports";
import { IUseCase } from "@language-app/common-platform";
import { UserNotFoundError } from "@common/errors";

type InputParams = {
  userId: string;
  activityId: number;
};
type Return = void;

export type IDeleteActivityFromStudentListUseCase = IUseCase<
  InputParams,
  Return
>;

class UseCase implements IDeleteActivityFromStudentListUseCase {
  constructor(
    private activityRepository: IActivityRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute({ userId, activityId }: InputParams) {
    const student = await this.studentRepository.getStudentByUserId(userId);

    if (!student) {
      throw new UserNotFoundError();
    }

    const studentList =
      await this.activityRepository.getStudentListActivityIdsByStudentId(
        student.id
      );
    if (!studentList.includes(activityId)) return; // Idempotency. Or perhaps HTTP 304 would be more appropriate?

    return this.activityRepository.deleteActivityFromStudentList(
      student.id,
      activityId
    );
  }
}

export default UseCase;
