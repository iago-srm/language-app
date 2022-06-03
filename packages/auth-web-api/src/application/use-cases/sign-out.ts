import {
  IUseCase,
  IUserRepository
} from '../ports';
import {
  ITokenContent
} from '@language-app/common';

type InputParams = ITokenContent;
type Return = {};

export type ISignOutUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignOutUseCase {

  constructor(
    private userRepository: IUserRepository
  ){}

  async execute ({ id, tokenVersion }) {
    const userDTO = await this.userRepository.getUserById(id);

    if(userDTO.tokenVersion === tokenVersion) {
      await this.userRepository.updateUser(id, {
        tokenVersion: tokenVersion + 1
      })
    }

    return {}
  }

};

export default UseCase;
