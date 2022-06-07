import {
  IUseCase,
  IUserRepository,
  UserDTO,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
  IEmailService,
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
type Return = ISignUpAPIResponse;

export type ISignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignUpUseCase {
  constructor (
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
    private idService: IIdGenerator,
    private emailService: IEmailService
  ){}
  async execute({ email, password, name, confirmPassword }) {
    const user = new User({ email, name, password });

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) throw new EmailAlreadySignedupError();

    if (password !== confirmPassword) throw new PasswordsDontMatchError();

    const userDTO: UserDTO = {
      id: this.idService.getId(),
      email: user.personId.email,
      name: user.personId.name,
      hashedPassword: await this.encryptionService.encrypt(user.password),
      tokenVersion: 0
    };

    await this.userRepository.insertUser(userDTO);

    // await this.emailService.sendEmail(
    //   email,
    //   'Confirme sua conta',
    //   {
    //     text: 'Texto testte',
    //     html: '<p><strong>HTML teste</strong></p>'
    //   }
    // );

    const token = this.tokenService.generate({
      id: userDTO.id,
      tokenVersion: userDTO.tokenVersion,
    });

    return {
      token,
      // user: {
      //   id: userDTO.id,
      //   email: userDTO.email,
      //   name: userDTO.name,
      //   image: userDTO.image,
      //   role: userDTO.role
      // }
    };
  }

}

export default UseCase;
