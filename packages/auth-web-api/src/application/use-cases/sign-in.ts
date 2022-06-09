import {
  IUseCase,
  IUserRepository,
  IEncryptionService,
  ITokenService,
  UserDTO
} from '../ports';
import {
  CredentialsNotProvidedError,
  InvalidCredentialsError,
  UserNotVerifiedError,
  ISignInAPIResponse,
  ISignInAPIParams,
} from '@language-app/common';

type InputParams = ISignInAPIParams;
type Return = ISignInAPIResponse;

export type ISignInUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignInUseCase {

  constructor(
    private userRepository: IUserRepository,
    private encryptionService: IEncryptionService,
    private tokenService: ITokenService,
  ) {}

  async execute({ id, email, password }) {
    let userDTO: UserDTO;

    const validateUser = (user: UserDTO) => {
      if(!user) throw new InvalidCredentialsError();
      if(!user.emailVerified) throw new UserNotVerifiedError();
    }

    if(id) {
      userDTO = await this.userRepository.getUserById(id);
      validateUser(userDTO);
    }
    else if (email && password) {
      userDTO = await this.userRepository.getUserByEmail(email);
      validateUser(userDTO);

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
