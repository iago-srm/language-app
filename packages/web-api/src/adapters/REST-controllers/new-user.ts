import {
  INewUserUseCase
} from '@application/use-cases';
import { NewUserHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const NewUserControllerFactory = ({
  newUserUseCase
}: {
  newUserUseCase: INewUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {

    const {
      authApiId,
      name,
      email,
      role,
      tokenVersion,
      image
    } = controllerSerializer(body, ['authApiId', 'name', 'email', 'role', 'tokenVersion', 'image']);

    if(isNaN(Number(tokenVersion)))   
      throw new Error(`Invalid Token Version: ${tokenVersion}`);

    await newUserUseCase.execute({ 
      authApiId: authApiId, 
      name, 
      email, 
      role, 
      tokenVersion: Number(tokenVersion),
      image 
    });

    return {
      response: "",
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    ...NewUserHTTPDefinition
  };
};
