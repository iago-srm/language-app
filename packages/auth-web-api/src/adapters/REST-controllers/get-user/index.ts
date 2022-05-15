import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';

export const GetUserControllerFactory = (): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (req) => {
    const resp = req.user;

    return {
      response: resp,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: 'get',
    path: 'user',
    // middleware: 'auth'
  };
};
