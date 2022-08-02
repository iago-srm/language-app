import {
  IUserRepository,
  IIdGenerator
} from '../ports';
import {
  IUseCase
} from '@language-app/common';

type InputParams = {
  name: string;
  email: string;
  role: string
};
type Return = void;

export type INewUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements INewUserUseCase {

  constructor(
    private userRepository: IUserRepository,
    private idService: IIdGenerator
  ){}

  async execute ({ role, name, email }) {

    const id = this.idService.getId();
    if(role === 'STUDENT') await this.userRepository.insertUserAndStudent({ role, name, email }, id);
    else await this.userRepository.insertUserAndInstructor({ role, name, email }, id);

  }

};

export default UseCase;
