import {
  IUseCase,
  IUserRepository,
  IEncryptionService,
  ITokenService,
} from '../ports';
import {
  InvalidCredentialsError,
  LoginAPIResponse,
  LoginAPIParams,
} from '@language-app/common';

type InputParams = LoginAPIParams;
type Return = LoginAPIResponse;

export type ISignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignInUseCase {

  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
  ) {}

  async execute({ email, password }) {
    const userDTO = await this.userRepository.getUserByEmail(email);

    if (!userDTO) throw new InvalidCredentialsError();

    const passwordValid = await this.encryptionService.compare(
      password,
      userDTO.hashedPassword
    );

    if (!passwordValid) throw new InvalidCredentialsError();

    const token = this.tokenService.generate({
      id: userDTO.id || '',
      tokenVersion: userDTO.tokenVersion,
    });

    return {
      token,
      id: userDTO.id,
      email: userDTO.email,
      name: userDTO.name,
      image: userDTO.image
    };

  };
};

export default UseCase;
