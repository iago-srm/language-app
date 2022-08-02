import { ISignUpUseCase } from '@application/use-cases';
import { SignUpHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';

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
