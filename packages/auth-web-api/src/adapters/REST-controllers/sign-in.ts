import { ISignInUseCase } from '@application/use-cases';
import { SignInHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';

export const SignInControllerFactory = ({
  signInUseCase,
}: {
  signInUseCase: ISignInUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {

    const {
      email,
      password,
      id
    } = controllerSerializer(body, ['email', 'password', 'id']);

    const resp = await signInUseCase.execute({
      email,
      password,
      id
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
