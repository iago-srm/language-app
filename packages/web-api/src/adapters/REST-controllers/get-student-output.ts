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
  
      if(isNaN(Number(id))) throw new Error("student output id must be an int");
      return {
        response: await getStudentOutputUseCase.execute({
          studentOutputId: Number(id)
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
  