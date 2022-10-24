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
        cursor,
        pageSize
      } = controllerSerializer(query, [
        { name: 'cursor', optional: true },
        { name: 'pageSize', optional: true }
      ]);

      if(cursor && isNaN(Number(cursor))) throw new Error('cursor is not a number');
      if(pageSize && isNaN(Number(pageSize))) throw new Error('pageSize is not a number');

      const { id, role } = user;
  
      return {
        response: await getStudentOutputsUseCase.execute({
          cursor: cursor && Number(cursor),
          pageSize: pageSize && Number(pageSize),
          userId: id,
          role
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
  