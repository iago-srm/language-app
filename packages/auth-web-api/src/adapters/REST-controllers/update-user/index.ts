import { ISignUpUseCase } from '@application/use-cases';
import { UpdateUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const UpdateUserControllerFactory = ({
  signUpUseCase,
}: {
  signUpUseCase: ISignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { password, name, confirmPassword } =
      serializer(body);
    const response = await signUpUseCase.execute({
      name,
      password,
      confirmPassword,
    });

    return {
      response,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: UpdateUserHTTPDefinition.method,
    path: UpdateUserHTTPDefinition.path,
  };
};
