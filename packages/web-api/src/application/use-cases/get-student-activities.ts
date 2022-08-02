import {
  ActivityDTO,
  CEFR
} from '../ports';
import {
  IUseCase
} from '@language-app/common';

type InputParams = {
  cursor: number;
  title: string;
  cefr: string
};
type Return = ActivityDTO[];

export type IGetStudentActivitiesUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetStudentActivitiesUseCase {

  constructor(
  ){}

  async execute ({ }) {


    return []
  }

};

export default UseCase;
