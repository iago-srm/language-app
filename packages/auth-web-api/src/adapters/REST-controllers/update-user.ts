import {
  IUpdateUserUseCase
} from '@application/use-cases';
import { UpdateUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';
import {
  IUpdateUserParams,
  DomainRules
} from '@language-app/common';

export const UpdateUserControllerFactory = ({
  updateUserUseCase
}: {
  updateUserUseCase: IUpdateUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { user }) => {
    const {
      name,
      role,
    } = controllerSerializer(body, [{ name: 'name', optional: true }, 'role']);

    await updateUserUseCase.execute({
      role: role as any,
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
    middlewares: ['auth']
  };
};
