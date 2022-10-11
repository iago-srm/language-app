import {
  ActivityDTO,
  IActivityRepository,
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  id: number;
};
type Return = { activity: Partial<ActivityDTO> };

export type IGetActivityUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetActivityUseCase {

  constructor(
    private activityRepository: IActivityRepository
  ){}

  async execute ({ id }) {

    return {
      activity: await this.activityRepository.getActivityById(id)
    }

  }

};

export default UseCase;
