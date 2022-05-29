import { ISignUpUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const SignUpControllerFactory = ({
  signUpUseCase,
}: {
  signUpUseCase: ISignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { email, password, name, confirmPassword, role } =
      serializer(body);

    const response = await signUpUseCase.execute({
      email,
      name,
      password,
      confirmPassword,
      role,
    });

    return {
      response,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: 'post',
    path: 'signup',
  };
};
