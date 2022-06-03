import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';

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
    method: 'get',
    path: 'user',
    middleware: 'auth'
  };
};
