import { StudentOutputDTO, IStudentOutputRepository } from "../ports";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  studentOutputId: number;
};
type Return = StudentOutputDTO;

export type IGetStudentOutputUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetStudentOutputUseCase {
  constructor(private studentOutputRepository: IStudentOutputRepository) {}

  async execute({ studentOutputId }) {
    return this.studentOutputRepository.getStudentOutputById(studentOutputId);
  }
}

export default UseCase;
