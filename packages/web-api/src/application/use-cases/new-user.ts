import {
  IUserRepository,
  IIdGenerator
} from '../ports';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  userId: string;
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

  async execute ({ userId, role, name, email, tokenVersion }) {

    const id = this.idService.getId();

    const existingUser = await this.userRepository.getUserById(userId);
    if(existingUser) throw new Error(`User with id ${userId} already exists`);

    if(role === 'STUDENT') await this.userRepository.insertUserAndStudent({ role, name, email, tokenVersion }, userId, id);
    else await this.userRepository.insertUserAndInstructor({ role, name, email, tokenVersion }, userId, id);

  }

};

export default UseCase;
