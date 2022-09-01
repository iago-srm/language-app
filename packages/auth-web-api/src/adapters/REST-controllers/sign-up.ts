import { ISignUpUseCase } from '@application/use-cases';
import { SignUpHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const SignUpControllerFactory = ({
  signUpUseCase,
}: {
  signUpUseCase: ISignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {

  const fn: IHTTPController = async (_, body, __, { language }) => {

    const {
      email,
      password,
      name,
      confirmPassword
    } =  controllerSerializer(body, ['email', 'password', { name: 'name', optional: true }, 'confirmPassword']);

    await signUpUseCase.execute({
      email,
      name,
      password,
      confirmPassword,
      language
    });

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: SignUpHTTPDefinition.method,
    path: SignUpHTTPDefinition.path,
  };
};
