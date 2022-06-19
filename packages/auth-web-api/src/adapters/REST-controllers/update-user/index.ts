import {
  IUpdateUserUseCase
} from '@application/use-cases';
import { UpdateUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const UpdateUserControllerFactory = ({
  updateUserUseCase
}: {
  updateUserUseCase: IUpdateUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { user }) => {
    const {
      name,
      role,
    } = serializer(body);

      await updateUserUseCase.execute({
        role,
        userId: user.id
      })

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: UpdateUserHTTPDefinition.method,
    path: UpdateUserHTTPDefinition.path,
    middleware: 'auth'
  };
};
