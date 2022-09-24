import {
  IUserRepository,
  IIdGenerator
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  authApiId: string;
  name: string;
  email: string;
  role: string;
  tokenVersion: number;
};
type Return = void;

export type INewUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements INewUserUseCase {

  constructor(
    private userRepository: IUserRepository,
    private idService: IIdGenerator
  ){}

  async execute ({ authApiId, role, name, email, tokenVersion }) {

    const newId = this.idService.getId();

    const newUser = { 
      role, 
      name, 
      email, 
      tokenVersion,
      authApiId
    };

    if(role === 'STUDENT') 
      await this.userRepository.insertUserAndStudent(newUser, newId);
    else await this.userRepository.insertUserAndInstructor(newUser, newId);

  }

};

export default UseCase;
