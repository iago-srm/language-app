import {
    IChangeActivityProgressStatusUseCase,
  } from '@application/use-cases';
  import { ActivityProgressStatusHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const ChangeActivityProgressStatusControllerFactory = ({
    changeActivityProgressStatusUseCase,
  }: {
    changeActivityProgressStatusUseCase: IChangeActivityProgressStatusUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body, __, { user }) => {
  
      const {
        activityId,
        completed
      } = controllerSerializer(body, [
        'activityId',
        'completed' 
      ]) as any;

      const { id, role } = user;
  
      if(role !== "STUDENT") {
        throw new Error("Must be a student to start or complete activity")
      }
  
      return {
        response: await changeActivityProgressStatusUseCase.execute({
          userId: id,
          activityId,
          completed
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ...ActivityProgressStatusHTTPDefinition,
      middlewares: ['auth']
    };
  };
  