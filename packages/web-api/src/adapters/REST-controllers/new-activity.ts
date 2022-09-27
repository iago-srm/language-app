import {
    INewActivityUseCase,
  } from '@application/use-cases';
  import { NewActivityHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const NewActivityControllerFactory = ({
    newActivityUseCase,
  }: {
    newActivityUseCase: INewActivityUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (_, body, __, { user }) => {
  
      const activity = controllerSerializer(body, [
        'content', 
        { name: 'startTime', optional: true },
        { name: 'endTime', optional: true },
        'contentType',
        'title',
        'cefr',
        // 'timeToComplete',
        'topics',
        'instructions',
        { name: 'description', optional: true },
      ]) as any;
  
      if(!activity.instructions.length) throw new Error("activity must have instructions");

      const { id, role } = user;
  
      if(role !== "INSTRUCTOR") {
        throw new Error("Must be a instructor to insert activity")
      }
  
      return {
        response: await newActivityUseCase.execute({
          userId: id,
          activity
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ...NewActivityHTTPDefinition,
      middlewares: ['auth']
    };
  };
  