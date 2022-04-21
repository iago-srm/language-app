import { ICategorizeExtractsUseCase } from '@application/use-cases';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import { ParameterNotProvidedError } from '@common/errors';

export const CategorizeExtractsControllerFactory = ({
  categorizeExtractUseCase,
}: {
  categorizeExtractUseCase: ICategorizeExtractsUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, body) => {
    const extractId = params.extractId;
    const category = body.category;
    const userId = body.userId;

    if (!category || !userId) throw new ParameterNotProvidedError();

    const resp = await categorizeExtractUseCase.execute({
      extractId,
      category,
      userId,
    });

    return {
      response: resp,
      statusCode: 201,
    };
  };

  return {
    middleware: 'auth',
    controller: fn,
    method: 'patch',
    path: '/extracts/:extractId',
  };
};
