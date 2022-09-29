import { ISignInUseCase } from '@application/use-cases';
import { SignInHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const SignInControllerFactory = ({
  signInUseCase,
}: {
  signInUseCase: ISignInUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {

    const {
      email,
      password,
    } = controllerSerializer(body, ['email', 'password']);

    const resp = await signInUseCase.execute({
      email,
      password,
    });

    return {
      response: resp,
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    method: SignInHTTPDefinition.method,
    path: SignInHTTPDefinition.path,
  };
};
