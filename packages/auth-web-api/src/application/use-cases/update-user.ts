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

type InputParams = IUpdateUserParams & { userId: string; };
type Return = void;

export type IUpdateUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateUserUseCase {
  constructor (
    private userRepository: IUserRepository,
    private authEventQueue: IAuthEventQueue
  ){}
  async execute({ role, userId }) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    if(!DomainRules.USER.ROLES.includes(role))
      throw new InvalidRoleError();

    await this.userRepository.updateUser(userId, { role });

    await this.authEventQueue.publishNewUser(user);
  }

}

export default UseCase;
