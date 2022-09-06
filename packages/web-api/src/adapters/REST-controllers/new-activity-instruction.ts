import {
    INewActivityInstructionUseCase,
  } from '@application/use-cases';
  import { NewActivityInstructionHTTPDefinition } from '@language-app/common-core';
  import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
  } from '@language-app/common-platform';
  
  export const NewActivityInstructionControllerFactory = ({
    newActivityInstructionUseCase,
  }: {
    newActivityInstructionUseCase: INewActivityInstructionUseCase;
  }): IHTTPControllerDescriptor<IHTTPController> => {
    const fn: IHTTPController = async (params, body, __, { user }) => {
  
      const {id: activityId} = controllerSerializer(params, ['id']);
      const {instructions} = controllerSerializer(body, [
        'instructions',
      ]) as any;
  
      if(isNaN(Number(activityId))) throw new Error("Activity id must be a number");
      if(!instructions.length) throw new Error("Instructions must be an array");

      const { id, role } = user;
  
      if(role !== "INSTRUCTOR") {
        throw new Error("Must be a instructor to insert activity instructions")
      }
  
      return {
        response: await newActivityInstructionUseCase.execute({
          userId: id,
          activityId: Number(activityId),
          instructions
        }),
        statusCode: 200,
      };
    };
  
    return {
      controller: fn,
      ...NewActivityInstructionHTTPDefinition,
      middlewares: ['auth']
    };
  };
  