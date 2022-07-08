import {
  IUpdateProfileImageUseCase
} from '@application/use-cases';
import { UpdateProfileImageHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const UpdateProfileImageControllerFactory = ({
  updateProfileImageUseCase
}: {
  updateProfileImageUseCase: IUpdateProfileImageUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, ___, { file, user }) => {

    await updateProfileImageUseCase.execute({
      file,
      userId: user.id
    })

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: UpdateProfileImageHTTPDefinition.method,
    path: UpdateProfileImageHTTPDefinition.path,
    middlewares: ['file', 'auth']
  };
};
