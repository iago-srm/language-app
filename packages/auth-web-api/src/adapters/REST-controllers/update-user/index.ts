import {
  IValidateAccountUseCase,
  IUpdateUserUseCase
} from '@application/use-cases';
import { UpdateUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const UpdateUserControllerFactory = ({
  validateAccountUseCase,
  updateUserUseCase
}: {
  validateAccountUseCase: IValidateAccountUseCase;
  updateUserUseCase: IUpdateUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { user }) => {
    const {
      name,
      role,
      verificationToken,
    } = serializer(body);

    if(verificationToken) {
      await validateAccountUseCase.execute({
        verificationToken,
        userId: user.id
      })
    } else if (name || role) {
      await updateUserUseCase.execute({
        role,
        userId: user.id
      })
    }

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
