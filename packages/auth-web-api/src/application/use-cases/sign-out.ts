import {
  IUserRepository
} from '../ports';
import {
  ITokenContent,
  IUseCase
} from '@language-app/common';

type InputParams = ITokenContent;
type Return = void;

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
  }

};

export default UseCase;
