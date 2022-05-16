import {
  IUseCase,
  IUseCaseFactory,
  IUserRepository
} from '../ports';
import {
} from '@language-app/common';

type InputParams = {
  id: string;
  tokenVersion: number;
};
type Return = {};

type Dependencies = {
  userRepository: IUserRepository
};

export type ILogoutUseCase = IUseCase<InputParams, Return>;

type UseCaseFactory = IUseCaseFactory<Dependencies, InputParams, Return>;

const Factory: UseCaseFactory = ({
  userRepository
}) => {
  return {
    execute: async ({ id, tokenVersion }) => {
      const userDTO = await userRepository.getUserById(id);

      if(userDTO.tokenVersion === tokenVersion) {
        await userRepository.updateUser(id, {
          tokenVersion: tokenVersion + 1
        })
      }

      return {}
    },
  };
};

export default Factory;
