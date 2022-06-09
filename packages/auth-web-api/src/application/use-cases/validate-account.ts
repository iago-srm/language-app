import {
  IUseCase,
  IUserRepository,
} from '../ports';
import {
  UserNotFoundError,
  InvalidValidationTokenError
} from '@common/errors';
import {
  IValidateAccountParams,
} from '@language-app/common';

type InputParams = IValidateAccountParams;
type Return = void;

export type IValidateAccountUseCase = IUseCase<InputParams, Return>;

class UseCase implements IValidateAccountUseCase {
  constructor (
    private userRepository: IUserRepository,
  ){}
  async execute({ verificationToken, userId }) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    if(user.verificationToken !== verificationToken)
      throw new InvalidValidationTokenError();

    await this.userRepository.updateUser(userId, { emailVerified: true });
  }

}

export default UseCase;
