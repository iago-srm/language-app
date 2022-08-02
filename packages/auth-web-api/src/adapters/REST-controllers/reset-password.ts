import {
  IResetPasswordUseCase
} from '@application/use-cases';
import { ResetPasswordHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';

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
    } = controllerSerializer(body, ['password', 'confirmPassword', 'token']);

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
