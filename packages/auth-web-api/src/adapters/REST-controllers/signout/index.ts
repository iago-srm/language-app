import { ISignOutUseCase } from '@application/use-cases';
import { SignOutHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';

export const SignOutControllerFactory = ({
  signOutUseCase,
}: {
  signOutUseCase: ISignOutUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, ___, { user }) => {
    const { id, tokenVersion } = user;
    const resp = await signOutUseCase.execute({
      id,
      tokenVersion,
    });

    return {
      response: resp,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: SignOutHTTPDefinition.method,
    path: SignOutHTTPDefinition.path,
    middlewares: ['auth']
  };
};
