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
      cursor
    } = controllerSerializer(query, ['title', 'cefr', 'cursor']);

    const { id, role } = user;

    if(isNaN(Number(cursor))) throw new Error('cursor is not a number');

    // let useCase = role === 'STUDENT' ? getStudentActivitiesUseCase : getInstructorActivitiesUseCase;
    let resp;
    if(role === 'STUDENT') {
      resp = await getStudentActivitiesUseCase.execute({
        cursor: Number(cursor),
        title,
        cefr
      });
    } else {
      resp = await getInstructorActivitiesUseCase.execute({
        instructorId: id,
        cursor: Number(cursor),
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
