import {
  IUseCase,
  IUserRepository,
  IForgotPasswordTokenRepository,
  IEmailService,
  IIdGenerator,
} from '../ports';
import {
  UserNotFoundError,
  InvalidValidationTokenError,
  InvalidRoleError
} from '@common/errors';
import {
  IForgotPasswordParams,
  IForgotPasswordResponse
} from '@language-app/common';

type InputParams = IForgotPasswordParams;
type Return = IForgotPasswordResponse;

export type IForgotPasswordRequestUseCase = IUseCase<InputParams, Return>;

class UseCase implements IForgotPasswordRequestUseCase {
  constructor (
    private userRepository: IUserRepository,
    private forgotPasswordTokenRepository: IForgotPasswordTokenRepository,
    private emailService: IEmailService,
    private idService: IIdGenerator,
  ){}
  async execute({ email }) {

    const user = await this.userRepository.getUserByEmail(email);

    if(!user) throw new UserNotFoundError();

    const token = this.idService.getId();

    await this.forgotPasswordTokenRepository.insertToken({
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 3)
    });

    const resetPasswordLink = `${process.env.WEB_APP_URL}/reset-password?verificationToken=${token}`;

    await this.emailService.sendEmail(
      email,
      'Crie uma nova senha em language-app',
      {
        html: `
        <p>Clique no link para criar uma nova senha: ${resetPasswordLink}</p>
        <p>Se você não pediu uma nova senha, ignore este e-mail.</p>
        `
      }
    );

    return {
      email
    }
    // const token = await this.forgotPasswordTokenRepository.getTokenByUserId(userId);
  }

}

export default UseCase;
