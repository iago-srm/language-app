import {
    INewActivityUseCase,
  } from '@application/use-cases';
  import { NewActivityHTTPDefinition } from '@language-app/common';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common';
  
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
        'title',
        'cefr',
        'timeToComplete',
        'topics',
        'instruction'
      ]) as any;
  
      const { id, role } = user;
  
      if(role !== "INSTRUCTOR") {
        throw new Error("Must be a instructor to insert activity")
      }
  
      return {
        response: await newActivityUseCase.execute({
          activity
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      method: NewActivityHTTPDefinition.method,
      path: NewActivityHTTPDefinition.path,
      middlewares: ['auth']
    };
  };
  