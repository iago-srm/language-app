import { ILogoutUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';

export const LogoutControllerFactory = ({
  logoutUseCase,
}: {
  logoutUseCase: ILogoutUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, ___, { user }) => {
    const { id, tokenVersion } = user;
    const resp = await logoutUseCase.execute({
      id,
      tokenVersion,
    });

    return {
      response: resp,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: 'post',
    path: 'logout',
  };
};
