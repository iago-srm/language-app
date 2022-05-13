import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository,
  IEncryptionService,
  ITokenService,
} from '../ports';
import {
  InvalidCredentialsError,
  LoginAPIResponse,
  LoginAPIParams
} from '@language-app/common';

type InputParams = LoginAPIParams;
type Return = LoginAPIResponse;

type Dependencies = {
  userRepository: IUserRepository;
  encryptionService: IEncryptionService;
  tokenService: ITokenService;
};

export type ILoginUseCase = IUseCase<InputParams, Return>;

type UseCaseFactory = IUseCaseFactory<
  Dependencies,
  InputParams,
  Return
>;

const Factory: UseCaseFactory = ({
  userRepository,
  encryptionService,
  tokenService,
}) => {
  return {
    execute: async ({ email, password }) => {
      const userDTO = await userRepository.getUserByEmail(email);

      if (!userDTO) {
        throw new InvalidCredentialsError();
      }
      const passwordValid = await encryptionService.compare(
        password,
        userDTO.hashedPassword
      );

      if (!passwordValid) {
        throw new InvalidCredentialsError();
      }

      const token = tokenService.generate({
        id: userDTO.id || '',
        tokenVersion: userDTO.tokenVersion
      });

      return {
        token
      };
    },
  };
};

export default Factory
