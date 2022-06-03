import {
  IUseCase,
  IUserRepository,
  IEncryptionService,
  ITokenService,
} from '../ports';
import {
  InvalidCredentialsError,
  ILoginAPIResponse,
  ILoginAPIParams,
} from '@language-app/common';

type InputParams = ILoginAPIParams;
type Return = ILoginAPIResponse;

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
