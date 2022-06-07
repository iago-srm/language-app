import {
  IUseCase,
  IUserRepository,
  UserDTO,
  IEncryptionService,
} from '../ports';
import { User } from '@domain';
import {
} from '@common/errors';
import {
  IUpdateUserParams,
} from '@language-app/common';

type InputParams = IUpdateUserParams;
type Return = void;

export type IUpdateUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateUserUseCase {
  constructor (
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
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
