import {
  IVerifyAccountUseCase,
} from '@application/use-cases';
import { VerifyAccountHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import { controllerSerializer } from '@language-app/common';

export const VerifyAccountControllerFactory = ({
  verifyAccountUseCase,
}: {
  verifyAccountUseCase: IVerifyAccountUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, body, query) => {

    const { token } = controllerSerializer(params, ['token']);
    const { verified } = controllerSerializer(body, ['verified']);
    const { userId } = controllerSerializer(query, ['userId']);

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
