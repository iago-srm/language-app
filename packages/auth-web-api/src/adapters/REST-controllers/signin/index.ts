import { ISignInUseCase } from '@application/use-cases';
import { SignInHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import SerializeLoginBody from './serializer';

export const SignInControllerFactory = ({
  signInUseCase,
}: {
  signInUseCase: ISignInUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { email, password, id } = SerializeLoginBody(body);
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
