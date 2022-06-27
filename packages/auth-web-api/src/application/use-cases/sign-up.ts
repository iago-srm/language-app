import {
  IUseCase,
  IUserRepository,
  IVerificationTokenRepository,
  UserDTO,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
  IEmailService,
  IProfileImageRepository,
} from '../ports';
import { User } from '@domain';
import {
  PasswordsDontMatchError,
  EmailAlreadySignedupError,
} from '@common/errors';
import {
  ISignUpAPIParams,
  ISignUpAPIResponse
} from '@language-app/common';

type InputParams = ISignUpAPIParams;
type Return = void;

export type ISignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignUpUseCase {
  constructor (
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
    private idService: IIdGenerator,
    private emailService: IEmailService,
    private verificationTokenRepository: IVerificationTokenRepository,
    private profileImageRepository: IProfileImageRepository
  ){}
  async execute({ email, password, name, confirmPassword }) {
    const user = new User({ email, name, password });

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) throw new EmailAlreadySignedupError();

    if (password !== confirmPassword) throw new PasswordsDontMatchError();

    const token = this.idService.getId();
    const userId = this.idService.getId();

    const userDTO: UserDTO = {
      id: userId,
      email: user.personId.email,
      name: user.personId.name,
      image: this.profileImageRepository.getProfileImageUrl(),
      emailVerified: false,
      hashedPassword: await this.encryptionService.encrypt(user.password),
      tokenVersion: 0,
    };

    await this.userRepository.insertUser(userDTO);
    await this.verificationTokenRepository.insertToken({
      token,
      userId
    })

    const confirmationLink = `${process.env.WEB_APP_URL}/verify-account?verificationToken=${token}&userId=${userId}`;

    await this.emailService.sendEmail(
      email,
      'Confirme sua conta em language-app',
      {
        html: `
        <p>Clique no link para confirmar sua conta: ${confirmationLink}</p>
        `
      }
    );
  }

}

export default UseCase;
