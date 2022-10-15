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
  // do not allow update name for now
  async execute({ role, name, userId }: InputParams) {

    const userDTO = await this.userRepository.getUserById(userId);

    if (!userDTO) throw new UserNotFoundError();
    if(userDTO.role) return;

    new User({ role })

    console.log({ userId, role });
    await this.userRepository.updateUser(userId, { role });

    await this.authEventQueue.publishNewUser({
      ...userDTO,
      // name: name || userDTO.name, // try updating name if it has been provided
      role: userDTO.role || role // do not let update role if it already set
    });
  }

}

export default UseCase;
