import {
  IUseCase,
  IUserRepository,
  IVerificationTokenRepository
} from '../ports';
import {
  UserNotFoundError,
  InvalidValidationTokenError,
  InvalidRoleError
} from '@common/errors';
import {
  IVerifyAccountParams,
} from '@language-app/common';

type InputParams = IVerifyAccountParams;
type Return = void;

export type IVerifyAccountUseCase = IUseCase<InputParams, Return>;

class UseCase implements IVerifyAccountUseCase {
  constructor (
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository
  ){}
  async execute({ token: verificationToken, userId }) {

    const user = await this.userRepository.getUserById(userId);
    const token = await this.verificationTokenRepository.getTokenByUserId(userId);

    if (!user) throw new UserNotFoundError();
    if (!token) throw new InvalidValidationTokenError();

    if(token.token !== verificationToken)
      throw new InvalidValidationTokenError();

    await this.userRepository.updateUser(userId, { emailVerified: true });
  }

}

export default UseCase;
