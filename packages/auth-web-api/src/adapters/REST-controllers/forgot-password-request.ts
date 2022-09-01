import {
  IForgotPasswordRequestUseCase
} from '@application/use-cases';
import { ForgotPasswordRequestHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const ForgotPasswordRequestControllerFactory = ({
  forgotPasswordRequestUseCase
}: {
  forgotPasswordRequestUseCase: IForgotPasswordRequestUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { language }) => {
    const {
      email
    } = controllerSerializer(body, ['email']);

    const response = await forgotPasswordRequestUseCase.execute({
      email,
      language
    })

    return {
      response,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...ForgotPasswordRequestHTTPDefinition
  };
};
