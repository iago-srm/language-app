import {
  IUpdateProfileImageUseCase
} from '@application/use-cases';
import { UpdateProfileImageHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common-platform';

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
    ...UpdateProfileImageHTTPDefinition,
    middlewares: ['file', 'auth']
  };
};
