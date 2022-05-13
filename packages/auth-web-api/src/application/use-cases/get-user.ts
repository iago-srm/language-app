import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository,
  ITokenService,
} from '../ports';
import { InvalidCredentialsError, GetUserAPIResponse } from '@language-app/common';

type InputParams = {
  token: string;
};
type Return = GetUserAPIResponse;

type Dependencies = {
  userRepository: IUserRepository;
  tokenService: ITokenService;
};

export type IGetUserUseCase = IUseCase<InputParams, Return>;

type UseCaseFactory = IUseCaseFactory<
  Dependencies,
  InputParams,
  Return
>;

const Factory: UseCaseFactory = ({
  userRepository,
  tokenService,
}) => {
  return {
    execute: async ({ token }) => {
      const tokenContent = await tokenService.verify(token);
      if(!tokenContent.id || !tokenContent.tokenVersion) throw new Error('token sem propriedades')

      const userDTO = await userRepository.getUserById(tokenContent.id);

      if (!userDTO) {
        throw new InvalidCredentialsError();
      }

      if(userDTO.tokenVersion !== tokenContent.tokenVersion) throw new Error('403')

      return {
        ...userDTO
      };
    },
  };
};

export default Factory;
