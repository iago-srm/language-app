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
} from '@language-app/common-core';
import {
  IUseCase
} from '@language-app/common-platform';

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
    if (!token) throw new InvalidValidationTokenError();

    const user = await this.userRepository.getUserById(token.userId);
    if (!user) throw new UserNotFoundError();

    if(token.token !== verificationToken)
      throw new InvalidValidationTokenError();

    await this.userRepository.updateUser(token.userId, { emailVerified: true });
  }

}

export default UseCase;
