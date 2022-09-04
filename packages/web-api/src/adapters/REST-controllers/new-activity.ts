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
        'title',
        'cefr',
        'timeToComplete',
        'topics',
        'instructions',
        { name: 'description', optional: true },
      ]) as any;
  
      if(!activity.instructions.length) throw new Error("activity must have instructions");
      activity.instructions.forEach(instruction => {
        if(!instruction.text || !instruction.correctAnswer) throw new Error("Wrong format for activity instruction");
      });

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
  