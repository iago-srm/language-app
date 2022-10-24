import {
    IUpdateUserUseCase
  } from '@application/use-cases';
  import { DomainUpdateUserHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const UpdateUserControllerFactory = ({
     updateUserUseCase
  }: {
     updateUserUseCase: IUpdateUserUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
  
      const {
        authApiId,
        tokenVersion, 
        image
      } = controllerSerializer(body, [
        'authApiId', 
        { name: "tokenVersion", optional: true },
        { name: "image", optional: true },
      ]);
  
      if(tokenVersion && isNaN(Number(tokenVersion)))   
        throw new Error(`Invalid Token Version: ${tokenVersion}`);
  
      await updateUserUseCase.execute({ 
        authApiId, 
        tokenVersion: Number(tokenVersion),
        image 
      });
  
      return {
        response: "",
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ... DomainUpdateUserHTTPDefinition
    };
  };
  