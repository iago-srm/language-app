import {
  IUseCase,
  IUserRepository,
  UserDTO,
  IEncryptionService,
  ITokenService,
  IIdGenerator,
} from '../ports';
import { User } from '@domain';
import {
  PasswordsDontMatchError,
  EmailAlreadySignedupError,
} from '@common/errors';

export type InputParams = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
};
type Return = {
  token: String;
};

export type ISignUpUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignUpUseCase {
  constructor (
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
    private idService: IIdGenerator,
  ){}
  async execute({ email, name, password, confirmPassword, role }) {
    const user = new User({ email, name, role, password });

    const existingUser = await this.userRepository.getUserByEmail(email);

    if (existingUser) throw new EmailAlreadySignedupError();

    if (password !== confirmPassword) throw new PasswordsDontMatchError();

    const userDTO: UserDTO = {
      id: this.idService.getId(),
      email: user.personId.email,
      name: user.personId.name,
      role: user.role,
      hashedPassword: await this.encryptionService.encrypt(user.password),
      tokenVersion: 0,
    };

    await this.userRepository.insertUser(userDTO);

    const token = this.tokenService.generate({
      id: userDTO.id,
      tokenVersion: userDTO.tokenVersion,
    });

    return { token };
  }

}

export default UseCase;
