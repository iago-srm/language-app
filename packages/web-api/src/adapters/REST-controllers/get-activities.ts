import {
  IGetStudentActivitiesUseCase,
  IGetInstructorActivitiesUseCase
} from '@application/use-cases';
import { GetActivitiesHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';

export const GetActivitiesControllerFactory = ({
  getStudentActivitiesUseCase,
  getInstructorActivitiesUseCase
}: {
  getStudentActivitiesUseCase: IGetStudentActivitiesUseCase;
  getInstructorActivitiesUseCase: IGetInstructorActivitiesUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, query, { user }) => {

    const {
      title,
      cefr,
      topics,
      contentType,
      isInProgress,
      isComplete,
      cursor
    } = controllerSerializer(query, [
      { name: 'title', optional: true }, 
      { name: 'cefr', optional: true }, 
      { name: 'cursor', optional: true },
      { name: 'topics', optional: true, type: "array" },
      { name: 'contentType', optional: true },
      { name: 'isInProgress', optional: true },
      { name: 'isComplete', optional: true },
    ]);

    const { id, role } = user;

    if(cursor && isNaN(Number(cursor))) throw new Error('cursor must be a number');

    // same page lists activities. If instructor is logged in, it returns their activities.
    // if a student is logged in, it returns all activities, based on the filters applied.
    let resp;
    if(role === 'STUDENT') {
      console.log("student activities")
      resp = await getStudentActivitiesUseCase.execute({
        userId: id,
        cursor: cursor && Number(cursor),
        title,
        cefr,
        topics,
        contentType,
        isInProgress: isInProgress && true,
        isComplete: isComplete && true,
      });
    } else {
      console.log("instructor activities")
      resp = await getInstructorActivitiesUseCase.execute({
        userId: id,
        cursor: cursor && Number(cursor),
        title,
        cefr
      });
    }


    return {
      response: resp,
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
