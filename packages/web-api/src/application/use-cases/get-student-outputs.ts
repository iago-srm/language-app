import {
  StudentOutputDTO,
  ActivityDTO,
  IStudentOutputRepository,
  IStudentRepository,
  IInstructorRepository,
} from "../ports";
import {
  IUseCase,
  IPaginatedParams,
  IPaginatedResponse,
} from "@language-app/common-platform";

interface InputParams extends IPaginatedParams {
  userId: string;
  role: string;
  studentId?: string;
}
interface Return
  extends IPaginatedResponse<
    Partial<StudentOutputDTO> & Partial<ActivityDTO>
  > {}

export type IGetStudentOutputsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetStudentOutputsUseCase {
  constructor(
    private studentOutputRepository: IStudentOutputRepository,
    private instructorRepository: IInstructorRepository,
    private studentRepository: IStudentRepository
  ) {}

  async execute({ userId, role, cursor, pageSize, studentId }) {
    let studentOutputs;

    if (role === "STUDENT") {
      const student = await this.studentRepository.getStudentByUserId(userId);
      if (!student) throw new Error("Student not found");

      studentOutputs =
        await this.studentOutputRepository.getStudentOutputsByStudentIds({
          studentIds: [student.id],
          cursor,
          pageSize,
        });
    } else {
      // const instructor = await this.instructorRepository.getInstructorByUserId(userId);
      // if(!instructor) throw new Error("Instructor not found");

      // allow any instructor to see any output
      studentOutputs =
        await this.studentOutputRepository.getStudentOutputsByStudentIds({
          studentIds: [studentId],
          cursor,
          pageSize,
        });
    }

    return {
      data: studentOutputs,
      cursor: studentOutputs[studentOutputs.length - 1]?.id || undefined,
    };
  }
}

export default UseCase;
