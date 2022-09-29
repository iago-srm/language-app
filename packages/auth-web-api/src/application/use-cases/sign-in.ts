import {
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO
} from '../ports';
import {
  CredentialsNotProvidedError,
  InvalidCredentialsError,
  UserNotVerifiedError,
} from '@common/errors';
import {
  ISignInAPIResponse,
  ISignInAPIParams,
} from '@language-app/common-core';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = ISignInAPIParams;
type Return = ISignInAPIResponse;

export type ISignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignInUseCase {

  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
  ) {}

  async execute({ email, password }) {
    let userDTO: UserDTO;

    if (email && password) {
      userDTO = await this.userRepository.getUserByEmail(email);
      
      if(!userDTO) throw new InvalidCredentialsError();
      if(!userDTO.emailVerified) throw new UserNotVerifiedError({ email });

      const passwordValid = await this.encryptionService.compare(
        password,
        userDTO.hashedPassword
      );
      if (!passwordValid) throw new InvalidCredentialsError();
    }
    else {
      throw new CredentialsNotProvidedError();
    }

    const token = this.tokenService.generate({
      id: userDTO.id || '',
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
  };
};

export default UseCase;
