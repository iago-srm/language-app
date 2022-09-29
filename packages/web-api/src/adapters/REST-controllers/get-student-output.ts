import {
    IGetStudentOutputUseCase,
  } from '@application/use-cases';
  import { GetStudentOutputHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const GetStudentOutputControllerFactory = ({
    getStudentOutputUseCase,
  }: {
    getStudentOutputUseCase: IGetStudentOutputUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (params) => {
  
      const {
        id
      } = controllerSerializer(params, ['id']);
  
      return {
        response: await getStudentOutputUseCase.execute({
          studentOutputId: id
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      method: GetStudentOutputHTTPDefinition.method,
      path: GetStudentOutputHTTPDefinition.path,
      middlewares: ['auth']
    };
  };
  