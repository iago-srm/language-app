import {
  INewUserUseCase
} from '@application/use-cases';
import { NewUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common';

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
    } = controllerSerializer(body, [
      { name: 'name', optional: false },
      { name: 'email', optional: false },
      { name: 'role', optional: false },
    ]);

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
