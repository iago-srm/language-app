import {
    ISignOutUserUseCase
  } from '@application/use-cases';
  import { SignOutUserHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const SignOutUserControllerFactory = ({
    signOutUserUseCase
  }: {
    signOutUserUseCase: ISignOutUserUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body) => {
  
      const {
        authApiId,
        tokenVersion
      } = controllerSerializer(body, ['authApiId', 'tokenVersion']);
  
      if(isNaN(Number(tokenVersion)))   
        throw new Error(`Invalid Token Version: ${tokenVersion}`);
  
      await signOutUserUseCase.execute({ 
        authApiId, 
        tokenVersion: Number(tokenVersion) 
      });
  
      return {
        response: "",
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ...SignOutUserHTTPDefinition
    };
  };
  