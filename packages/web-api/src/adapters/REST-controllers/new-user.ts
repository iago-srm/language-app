import {
  INewUserUseCase
} from '@application/use-cases';
import { NewUserHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const NewUserControllerFactory = ({
  newUserUseCase
}: {
  newUserUseCase: INewUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {

    const {
      name,
      email,
      role
    } = controllerSerializer(body, ['name','email','role']);

    await newUserUseCase.execute({ name, email, role });

    return {
      response: "",
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    method: NewUserHTTPDefinition.method,
    path: NewUserHTTPDefinition.path,
  };
};
