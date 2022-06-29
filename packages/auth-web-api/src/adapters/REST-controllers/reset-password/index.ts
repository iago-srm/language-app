import {
  IResetPasswordUseCase
} from '@application/use-cases';
import { ResetPasswordHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from '../serializer';

export const ResetPasswordControllerFactory = ({
  resetPasswordUseCase
}: {
  resetPasswordUseCase: IResetPasswordUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___) => {
    const {
      password,
      confirmPassword,
      token
    } = serializer(body, ['password', 'confirmPassword', 'token']);

    await resetPasswordUseCase.execute({
      password,
      confirmPassword,
      token
    })

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: ResetPasswordHTTPDefinition.method,
    path: ResetPasswordHTTPDefinition.path,
  };
};
