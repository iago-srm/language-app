import { IGetUserUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import { getAuthTokenFromHeader } from './serializer';

export const GetUserControllerFactory = ({
  getUserUseCase,
}: {
  getUserUseCase: IGetUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, ___, headers) => {
    const resp = await getUserUseCase.execute({
      token: getAuthTokenFromHeader(headers),
    });

    return {
      response: resp,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: 'get',
    path: 'user',
  };
};
