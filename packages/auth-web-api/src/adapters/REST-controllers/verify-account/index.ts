import {
  IVerifyAccountUseCase,
} from '@application/use-cases';
import { VerifyAccountHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import {serializer} from './serializer';

export const VerifyAccountControllerFactory = ({
  verifyAccountUseCase,
}: {
  verifyAccountUseCase: IVerifyAccountUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async ({ token }, { verified }, { userId }) => {
    // const {
    //   verificationToken,
    //   userId
    // } = serializer(body);

    if(verified) await verifyAccountUseCase.execute({
      verificationToken: token,
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
