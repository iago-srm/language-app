import {
  IUseCase,
  IUseCaseFactory,
} from '../ports';
import {
} from '@language-app/common';

type InputParams = {};
type Return = {};

type Dependencies = {};

export type ILogoutUseCase = IUseCase<InputParams, Return>;

type UseCaseFactory = IUseCaseFactory<Dependencies, InputParams, Return>;

const Factory: UseCaseFactory = ({
}) => {
  return {
    execute: async () => {

      return {}
    },
  };
};

export default Factory;
