import {
    INewStudentOutputUseCase,
  } from '@application/use-cases';
  import { PostStudentOutputHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const NewStudentOutputControllerFactory = ({
    newStudentOutputUseCase,
  }: {
    newStudentOutputUseCase: INewStudentOutputUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body, __, { user }) => {
  
      const {
        outputs,
        activityId
      } = controllerSerializer(body, [
        'outputs', 
        'activityId'
      ]) as any;
  
      const { id, role } = user;
  
      if(role !== "STUDENT") {
        // throw new Error("Must be a student to insert output")
      }
  
      return {
        response: await newStudentOutputUseCase.execute({
          userId: id,
          outputs,
          activityId: Number(activityId)
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ...PostStudentOutputHTTPDefinition,
      middlewares: ['auth']
    };
  };
  