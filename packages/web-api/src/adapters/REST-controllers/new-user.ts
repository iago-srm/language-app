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
      id,
      name,
      email,
      role,
      tokenVersion
    } = controllerSerializer(body, ['id', 'name', 'email', 'role', 'tokenVersion']);

    if(isNaN(Number(tokenVersion)))   
      throw new Error(`Invalid Token Version: ${tokenVersion}`);

    await newUserUseCase.execute({ 
      userId: id, name, email, role, 
      tokenVersion: Number(tokenVersion) 
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
