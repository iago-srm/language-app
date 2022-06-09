import {
  IValidateAccountUseCase
} from '@application/use-cases';
import { UpdateUserHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const UpdateUserControllerFactory = ({
  validateAccountUseCase,
  // updateUserUseCase
}: {
  validateAccountUseCase: IValidateAccountUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const {
      name,
      role,
      verificationToken,
      userId
    } = serializer(body);

    if(verificationToken && userId) {
      await validateAccountUseCase.execute({
        verificationToken,
        userId
      })
    } else if (name || role) {
      // await
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
  };
};
