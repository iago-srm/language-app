import {
    IGetStudentOutputsUseCase,
  } from '@application/use-cases';
  import { GetStudentOutputsHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const GetStudentOutputsControllerFactory = ({
    getStudentOutputsUseCase,
  }: {
    getStudentOutputsUseCase: IGetStudentOutputsUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, __, query, { user }) => {
  
      const {
        cursor
      } = controllerSerializer(query, ['cursor']);
      if(isNaN(Number(cursor))) throw new Error('cursor is not a number');

      const { id } = user;
  
      return {
        response: await getStudentOutputsUseCase.execute({
          cursor: Number(cursor),
          studentId: id
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      method: GetStudentOutputsHTTPDefinition.method,
      path: GetStudentOutputsHTTPDefinition.path,
      middlewares: ['auth']
    };
  };
  