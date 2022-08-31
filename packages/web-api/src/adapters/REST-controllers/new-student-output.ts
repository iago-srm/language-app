import {
    INewStudentOutputUseCase,
  } from '@application/use-cases';
  import { NewStudentOutputHTTPDefinition } from '@language-app/common';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common';
  
  export const NewStudentOutputControllerFactory = ({
    newStudentOutputUseCase,
  }: {
    newStudentOutputUseCase: INewStudentOutputUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body, __, { user }) => {
  
      const output = controllerSerializer(body, [
        'answers', 
        { name: 'feedback', optional: true }
      ]) as any;
  
      const { id, role } = user;
  
      if(role !== "STUDENT") {
        throw new Error("Must be a student to insert output")
      }
  
      return {
        response: await newStudentOutputUseCase.execute({output}),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      method: NewStudentOutputHTTPDefinition.method,
      path: NewStudentOutputHTTPDefinition.path,
      middlewares: ['auth']
    };
  };
  