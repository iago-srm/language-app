import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository,
  IEncryptionService,
  ITokenService,
} from '../ports';
import { InvalidCredentialsError } from '@language-app/common';

export type LoginInputParams = {
  email: string;
  password: string;
};

type Return = {
  token: string;
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};
type Dependencies = {
  userRepository: IUserRepository;
  encryptionService: IEncryptionService;
  tokenService: ITokenService;
};

export type ILoginUseCase = IUseCase<LoginInputParams, Return>;
export type ILoginUseCaseFactory = IUseCaseFactory<
  Dependencies,
  LoginInputParams,
  Return
>;

export const LoginUseCaseFactory: ILoginUseCaseFactory = ({
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
        email: userDTO.email,
        name: userDTO.name,
      });

      return {
        token,
        name: userDTO.name,
        email: userDTO.email,
        id: userDTO.id,
      };
    },
  };
};
