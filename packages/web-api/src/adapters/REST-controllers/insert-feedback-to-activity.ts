import {
    IInsertFeedbackToActivityUseCase
  } from '@application/use-cases';
import { InsertFeedbackToActivityHTTPDefinition } from '@language-app/common-core';
import {
IHTTPController,
IHTTPControllerDescriptor,
controllerSerializer
} from '@language-app/common-platform';

export const InsertFeedbackToActivityControllerFactory = ({
    insertFeedbackToActivityUseCase
}: {
    insertFeedbackToActivityUseCase: IInsertFeedbackToActivityUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
const fn: IHTTPController = async (__, body, _, { user }) => {
    const {
        feedbacks
    } = controllerSerializer(body, ['feedbacks']);

    const { id } = user;

    const response = await insertFeedbackToActivityUseCase.execute({
        userId: id,
        feedbacks
    })

    return {
    response,
    statusCode: 200,
    };
};

return {
    controller: fn,
    ...InsertFeedbackToActivityHTTPDefinition,
    middlewares: ['auth']
    };
};
