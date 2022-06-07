import { IProviderSignInUseCase } from '@application/use-cases';
import { ProviderSignInHTTPDefinition } from '@language-app/common';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from '../../ports/REST-controllers';
import SerializeBody from './serializer';

export const ProviderSignInControllerFactory = ({
  providerSignInUseCase,
}: {
  providerSignInUseCase: IProviderSignInUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { email, name, id, image, provider } = SerializeBody(body);
    const resp = await providerSignInUseCase.execute({
      provider,
      email,
      name,
      id,
      image,
    });

    return {
      response: resp,
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    method: ProviderSignInHTTPDefinition.method,
    path: ProviderSignInHTTPDefinition.path,
  };
};
