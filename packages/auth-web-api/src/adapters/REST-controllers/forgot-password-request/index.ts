import {
  IForgotPasswordRequestUseCase
} from '@application/use-cases';
import { ForgotPasswordRequestHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from '../serializer';

export const ForgotPasswordRequestControllerFactory = ({
  forgotPasswordRequestUseCase
}: {
  forgotPasswordRequestUseCase: IForgotPasswordRequestUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___) => {
    const {
      email
    } = serializer(body, ['email']);

    const response = await forgotPasswordRequestUseCase.execute({
      email
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
