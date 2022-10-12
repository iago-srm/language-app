import {
    IInstructorRepository, IStudentOutputRepository
} from '../ports';
import {
IUseCase
} from '@language-app/common-platform';

type InputParams = {
    userId: string;
    studentOutputId: number,
    feedbacks: {
        instructionOutputId: string;
        feedback: string;
    }[]
}
type Return = void;

export type IInsertFeedbackToActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IInsertFeedbackToActivityUseCase {

constructor(
    private instructorRepository: IInstructorRepository,
    private studentOutputRepository: IStudentOutputRepository
){}

async execute ({ userId, studentOutputId, feedbacks }: InputParams) {
    // do something with this, like associate feedback given or send e-mail to student
    const instructor = await this.instructorRepository.getInstructorByUserId(userId);

    if(!instructor) {
        throw new Error("Instructor not found");
    }

    await this.studentOutputRepository.insertStudentOutputFeedbacks(feedbacks);
    await this.studentOutputRepository.updateStudentOutputById(studentOutputId, { feedbackGiven: true });
}

};

export default UseCase;
