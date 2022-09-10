import { IGoogleSignUpUseCase } from '@application/use-cases';
import { GoogleSignUpHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const GoogleSignUpControllerFactory = ({
  googleSignUpUseCase,
}: {
  googleSignUpUseCase: IGoogleSignUpUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {

    const {
      id,
      name,
      email
    } = controllerSerializer(body, ['name', 'email', 'id']);

    return {
      response: await googleSignUpUseCase.execute({
        id,
        name,
        email
      }),
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    ...GoogleSignUpHTTPDefinition
  };
};
