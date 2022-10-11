import {
  IGetActivitiesUseCase,
} from '@application/use-cases';
import { GetActivitiesHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const GetActivitiesControllerFactory = ({
  getActivitiesUseCase,
}: {
  getActivitiesUseCase: IGetActivitiesUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, query, { user }) => {

    const {
      title,
      cefr,
      topics,
      contentTypes,
      isMyList,
      cursor,
      thisInstructorOnly
    } = controllerSerializer(query, [
      { name: 'title', optional: true }, 
      { name: 'cefr', optional: true }, 
      { name: 'cursor', optional: true },
      { name: 'topics', optional: true, type: "array" },
      { name: 'contentTypes', optional: true, type: "array" },
      { name: 'isMyList', optional: true },
      { name: 'thisInstructorOnly', optional: true },
    ]);

    const { id, role } = user;

    if(cursor && isNaN(Number(cursor))) throw new Error('cursor must be a number');

    return {
      response: await getActivitiesUseCase.execute({
        userId: id,
        cursor: cursor && Number(cursor),
        title,
        cefr,
        topics,
        contentTypes,
        isMyList: role === "STUDENT" && isMyList === "true",
        thisInstructorOnly: role === "INSTRUCTOR" && thisInstructorOnly === "true"
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: GetActivitiesHTTPDefinition.method,
    path: GetActivitiesHTTPDefinition.path,
    middlewares: ['auth']
  };
};
