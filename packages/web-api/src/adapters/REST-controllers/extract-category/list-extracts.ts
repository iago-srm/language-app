import { IGetExtractsUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {
  CannotAlterUserError,
  ParameterNotProvidedError,
} from '@common/errors';

export const GetExtractsControllerFactory = ({
  getExtractsUseCase,
}: {
  getExtractsUseCase: IGetExtractsUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, query, { user }) => {
    const userId = query.userId;
    if (!userId) throw new ParameterNotProvidedError();

    if (userId != user.id) throw new CannotAlterUserError();

    const resp = await getExtractsUseCase.execute({
      userId,
    });

    return {
      response: resp,
      statusCode: 200,
    };
  };

  return {
    middleware: 'auth',
    controller: fn,
    method: 'get',
    path: '/extracts',
  };
};
