import {
  IUserRepository,
  IAuthEventQueue
} from '../ports';
import {
  UserNotFoundError,
  InvalidRoleError
} from '@common/errors';
import {
  IUpdateUserParams,
  DomainRules,
  IUseCase
} from '@language-app/common';
import { User } from '@domain';

type InputParams = IUpdateUserParams & { userId: string; };
type Return = void;

export type IUpdateUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateUserUseCase {
  constructor (
    private userRepository: IUserRepository,
    private authEventQueue: IAuthEventQueue
  ){}
  async execute({ role, name, userId }) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    new User({ role, name })

    await this.userRepository.updateUser(userId, { role, name });

    await this.authEventQueue.publishNewUser(user);
  }

}

export default UseCase;
