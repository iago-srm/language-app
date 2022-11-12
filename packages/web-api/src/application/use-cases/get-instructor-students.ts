import { IInstructorRepository } from "../ports";
import { IUseCase, IPaginatedParams } from "@language-app/common-platform";

interface InputParams {
  userId: string;
}
type Return = {
  id: string;
  name: string;
}[];

export type IGetInstructorStudentsUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetInstructorStudentsUseCase {
  constructor(private instructorRepository: IInstructorRepository) {}

  async execute({ userId }) {
    const instructor = await this.instructorRepository.getInstructorByUserId(
      userId
    );
    if (!instructor) throw new Error("Instructor not found");
    return this.instructorRepository.getThisInstructorStudents(instructor.id);
  }
}

export default UseCase;
