import {
  IUserRepository,
  IForgotPasswordTokenRepository,
  IAuthEmailService,
  IIdGenerator,
} from '../ports';
import {
  UserNotFoundError,
} from '@common/errors';
import {
  IForgotPasswordParams,
  IForgotPasswordResponse,
  IUseCase
} from '@language-app/common';

type InputParams = IForgotPasswordParams & { language: string };
type Return = IForgotPasswordResponse;

export type IForgotPasswordRequestUseCase = IUseCase<InputParams, Return>;

class UseCase implements IForgotPasswordRequestUseCase {

  constructor (
    private userRepository: IUserRepository,
    private forgotPasswordTokenRepository: IForgotPasswordTokenRepository,
    private authEmailService: IAuthEmailService,
    private idService: IIdGenerator,
  ){}

  async execute({ email, language }) {

    const user = await this.userRepository.getUserByEmail(email);

    if(!user) throw new UserNotFoundError();

    const token = this.idService.getId();

    await this.forgotPasswordTokenRepository.insertToken({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3) //3h
    });

    await this.authEmailService.sendForgotPasswordEmail({
      destination: email,
      language,
      url: `${process.env.WEB_APP_URL}/reset-password?verificationToken=${token}`
    });

    return {
      email
    }
  }

}

export default UseCase;
