import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common-platform';
import { GetUserHTTPDefinition } from '@language-app/common-core';

export const GetUserControllerFactory = (): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_,__,___, { user }) => {
    return {
      response: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image
      },
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: GetUserHTTPDefinition.method,
    path: GetUserHTTPDefinition.path,
    middlewares: ['auth']
  };
};
