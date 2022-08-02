import {
  IUserRepository,
  IVerificationTokenRepository
} from '../ports';
import {
  UserNotFoundError,
  InvalidValidationTokenError,
} from '@common/errors';
import {
  IVerifyAccountParams,
  IUseCase
} from '@language-app/common';

type InputParams = IVerifyAccountParams;
type Return = void;

export type IVerifyAccountUseCase = IUseCase<InputParams, Return>;

class UseCase implements IVerifyAccountUseCase {
  constructor (
    private userRepository: IUserRepository,
    private verificationTokenRepository: IVerificationTokenRepository
  ){}
  async execute({ token: verificationToken }) {

    const token = await this.verificationTokenRepository.getTokenByTokenValue(verificationToken);
    const user = await this.userRepository.getUserById(token.userId);

    if (!user) throw new UserNotFoundError();
    if (!token) throw new InvalidValidationTokenError();

    if(token.token !== verificationToken)
      throw new InvalidValidationTokenError();

    await this.userRepository.updateUser(token.userId, { emailVerified: true });
  }

}

export default UseCase;
