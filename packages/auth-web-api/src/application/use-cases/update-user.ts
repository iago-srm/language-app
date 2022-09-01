import {
  IUserRepository,
  IAuthEventQueue
} from '../ports';
import {
  UserNotFoundError,
} from '@common/errors';
import {
  IUpdateUserParams,
} from '@language-app/common-core';
import {
  IUseCase
} from '@language-app/common-platform';
import { User } from '@domain';

type InputParams = IUpdateUserParams & { userId: string; };
type Return = void;

export type IUpdateUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateUserUseCase {
  constructor (
    private userRepository: IUserRepository,
    private authEventQueue: IAuthEventQueue
  ){}
  async execute({ role, name, userId }: InputParams) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    new User({ role, name })

    await this.userRepository.updateUser(userId, { role, name });

    await this.authEventQueue.publishNewUser(user);
  }

}

export default UseCase;
