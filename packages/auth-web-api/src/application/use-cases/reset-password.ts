import {
  IUserRepository,
  IForgotPasswordTokenRepository,
  IEncryptionService
} from '../ports';
import {
  InvalidValidationTokenError,
  InvalidPasswordError
} from '@common/errors';
import {
  IResetPasswordParams,
  IUseCase
} from '@language-app/common';
import { User } from '@domain';

type InputParams = IResetPasswordParams;
type Return = void;

export type IResetPasswordUseCase = IUseCase<InputParams, Return>;

class UseCase implements IResetPasswordUseCase {
  constructor (
    private userRepository: IUserRepository,
    private forgotPasswordTokenRepository: IForgotPasswordTokenRepository,
    private encryptionService: IEncryptionService
  ){}
  async execute({ token: t, password, confirmPassword }) {

    const token = await this.forgotPasswordTokenRepository.getTokenByTokenValue(t);

    if(!token || token.expiresAt.valueOf() < Date.now()) throw new InvalidValidationTokenError();

    new User({ password });

    if(password !== confirmPassword) throw new InvalidPasswordError();

    await this.userRepository.updateUser(token.userId, {
      hashedPassword: await this.encryptionService.encrypt(password)
    });

    await this.forgotPasswordTokenRepository.updateToken(token.id, {
      expiresAt: new Date(Date.now())
    });
  }

}

export default UseCase;
