import {
    StudentOutputDTO,
    ActivityDTO,
    IActivityRepository,
    IStudentRepository,
    IInstructorRepository
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    cursor?: number,
    userId: string;
    role: string;
  };
  type Return = (Partial<StudentOutputDTO> & Partial<ActivityDTO>)[];
  
  export type IGetStudentOutputsUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGetStudentOutputsUseCase {
  
    constructor(
      private activityRepository: IActivityRepository,
      private instructorRepository: IInstructorRepository,
      private studentRepository: IStudentRepository
    ){}
  
    async execute ({ userId, role, cursor }) {

      if(role === "STUDENT") {
        const student = await this.studentRepository.getStudentByUserId(userId);
        if(!student) throw new Error("Student not found");

        return this.activityRepository.getStudentOutputsByStudentIds([student.id]);
      } else {
        const instructor = await this.instructorRepository.getInstructorByUserId(userId);
        if(!instructor) throw new Error("Instructor not found");

        const studentIds = await this.instructorRepository.getThisInstructorStudentIds(instructor.id);
        console.log({studentIds});
        return this.activityRepository.getStudentOutputsByStudentIds(studentIds);

      }
      
    }
  
  };
  
  export default UseCase;
  