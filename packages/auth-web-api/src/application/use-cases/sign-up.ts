import {
  IUseCase,
  IUserRepository,
  IVerificationTokenRepository,
  UserDTO,
  IEncryptionService,
  IIdGenerator,
  IAuthEmailService,
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

type InputParams = ISignUpAPIParams & { language: string };
type Return = void;

export type ISignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignUpUseCase {

  constructor (
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private idService: IIdGenerator,
    private emailService: IAuthEmailService,
    private verificationTokenRepository: IVerificationTokenRepository,
    private profileImageRepository: IProfileImageRepository
  ){}

  async execute({ email, password, name, confirmPassword, language }) {
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
      image: this.profileImageRepository.getGenericImageUrl(),
      emailVerified: false,
      hashedPassword: await this.encryptionService.encrypt(user.password),
      tokenVersion: 0,
    };

    await this.userRepository.insertUser(userDTO);
    await this.verificationTokenRepository.insertToken({
      token,
      userId
    })

    await this.emailService.sendVerifyAccountEmail({
      destination: email,
      language,
      url: `${process.env.WEB_APP_URL}/verify-account?verificationToken=${token}&userId=${userId}`
    });
  }

}

export default UseCase;
