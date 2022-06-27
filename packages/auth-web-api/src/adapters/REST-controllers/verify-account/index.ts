import {
  IVerifyAccountUseCase,
} from '@application/use-cases';
import { VerifyAccountHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {
  serializeBody,
  serializeParams,
  serializeQuery
} from './serializer';

export const VerifyAccountControllerFactory = ({
  verifyAccountUseCase,
}: {
  verifyAccountUseCase: IVerifyAccountUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, body, query) => {

    const { token } = serializeParams(params);
    const { verified } = serializeBody(body);
    const { userId } = serializeQuery(query);

    if(verified) await verifyAccountUseCase.execute({
      token,
      userId
    });

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: VerifyAccountHTTPDefinition.method,
    path: VerifyAccountHTTPDefinition.path,
  };
};
