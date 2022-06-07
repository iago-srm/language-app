import {
  IUseCase,
  IUserRepository,
  UserDTO,
  ITokenService,
} from '../ports';
import {
  IProviderSignInParams,
  IProviderSignInResponse
} from '@language-app/common';

type InputParams = IProviderSignInParams;
type Return = IProviderSignInResponse;

export type IProviderSignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements IProviderSignInUseCase {
  constructor (
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
  ){}
  async execute({ email, name, image, id, provider }) {

    const existingUser = await this.userRepository.getUserById(id);

    if (existingUser) {
      return {
        token: this.tokenService.generate({
          id,
          tokenVersion: existingUser.tokenVersion,
        })
      }
    }

    const userDTO: UserDTO = {
      id,
      email,
      name,
      tokenVersion: 0,
      provider,
      image
    };

    await this.userRepository.insertUser(userDTO);

    return {
      token: this.tokenService.generate({
        id,
        tokenVersion: 0,
      })
    }
  }

}

export default UseCase;
