import {
  ActivityDTO,
  IActivityRepository,
  IInstructorRepository,
  IIdGenerator,
} from "../ports";
import { IUseCase } from "@language-app/common-platform";
import { Activity, ActivityInstruction } from "@domain";
import { UserNotFoundError } from "@common/errors";

type InputParams = {
  userId: string;
  activity: ActivityDTO;
};
type Return = ActivityDTO;

export type INewActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements INewActivityUseCase {
  constructor(
    private activityRepository: IActivityRepository,
    private instructorRepository: IInstructorRepository,
    private idService: IIdGenerator
  ) {}

  async execute({ userId, activity }) {
    // console.log({
    //   instructionsOptions: activity.instructions[0].options,
    //   instructionsOptionsAnswers: activity.instructions[0].optionsAnswers,
    // });
    activity.instructions.forEach(
      (instruction) => new ActivityInstruction({ ...instruction })
    );
    new Activity({ ...activity });

    activity.instructions = activity.instructions.map((inst) => {
      const instruction = {
        ...inst,
        isMultiCorrect:
          (inst.optionsAnswers && inst.optionsAnswers.length > 1) || false,
        id: this.idService.getId(),
      };

      if (instruction.options) {
        const options = {};
        for (let option of instruction.options) {
          options[option.id] = {
            text: option.text,
            id: this.idService.getId(),
          };
        }
        return {
          ...instruction,
          options: Object.values(options),
          optionsAnswers: instruction.optionsAnswers.map((id) => ({
            id: options[id].id,
          })),
        };
      }
      return instruction;
    });

    const instructor = await this.instructorRepository.getInstructorByUserId(
      userId
    );
    if (!instructor) throw new UserNotFoundError();

    return this.activityRepository.insertActivity(instructor.id, {
      ...activity,
    });
  }
}

export default UseCase;
