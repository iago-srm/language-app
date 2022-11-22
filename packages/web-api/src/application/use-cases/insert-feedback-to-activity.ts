import { IInstructorRepository, IStudentOutputRepository } from "../ports";
import { IUseCase } from "@language-app/common-platform";
import { UserNotFoundError } from "@common/errors";

type InputParams = {
  userId: string;
  studentOutputId: number;
  feedbacks: {
    instructionOutputId: string;
    feedback: string;
  }[];
};
type Return = void;

export type IInsertFeedbackToActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertFeedbackToActivityUseCase {
  constructor(
    private instructorRepository: IInstructorRepository,
    private studentOutputRepository: IStudentOutputRepository
  ) {}

  async execute({ userId, studentOutputId, feedbacks }: InputParams) {
    // do something with this, like associate feedback given or send e-mail to student
    const instructor = await this.instructorRepository.getInstructorByUserId(
      userId
    );

    if (!instructor) {
      throw new UserNotFoundError();
    }

    // if it is ever decided to disallow instructors to give feedback to students that aren't his:
    // const studentOutput = await this.studentOutputRepository.getStudentOutputById(studentOutputId);
    // const studentsThisInstructor = await this.instructorRepository.getThisInstructorStudents(instructor.id);

    // if(!studentsThisInstructor.map(({id}) => id).includes(studentOutput.studentId)) throw new Error("Cannot give feedback to this student");

    await this.studentOutputRepository.insertStudentOutputFeedbacks(feedbacks);
    await this.studentOutputRepository.updateStudentOutputById(
      studentOutputId,
      { feedbackGiven: true }
    );
  }
}

export default UseCase;
