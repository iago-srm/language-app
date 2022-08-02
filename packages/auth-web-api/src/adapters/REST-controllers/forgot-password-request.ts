import {
  IForgotPasswordRequestUseCase
} from '@application/use-cases';
import { ForgotPasswordRequestHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';

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
