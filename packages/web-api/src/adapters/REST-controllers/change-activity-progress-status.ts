import {
  InsertActivityIntoStudentListUseCase,
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
    changeActivityProgressStatusUseCase: InsertActivityIntoStudentListUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body, __, { user }) => {
  
      const {
        activityId,
      } = controllerSerializer(body, [
        'activityId',
      ]) as any;

      const { id, role } = user;
  
      if(role !== "STUDENT") {
        throw new Error("Must be a student to start or complete activity")
      }
  
      return {
        response: await changeActivityProgressStatusUseCase.execute({
          userId: id,
          activityId,
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
  