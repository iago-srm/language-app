import { ILoginUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import { CredentialsNotProvidedError } from '@language-app/common';
import SerializeLoginBody from './serializer';

export const LoginControllerFactory = ({
  loginUseCase,
}: {
  loginUseCase: ILoginUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { email, password } = SerializeLoginBody(body);
    const resp = await loginUseCase.execute({
      email,
      password,
    });
    console.log('login endpoint', { email, password });

    return {
      response: resp,
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    method: 'post',
    path: 'login',
  };
};
