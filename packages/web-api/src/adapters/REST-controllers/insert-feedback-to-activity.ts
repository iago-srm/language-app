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
const fn: IHTTPController = async (params, body, _, { user }) => {
    const {
        outputId,
    } = controllerSerializer(params, ['outputId']);
    if(isNaN(Number(outputId))) throw new Error("outputId must be a valid number")

    const {
        feedbacks
    } = controllerSerializer(body, ['feedbacks']);

    const { id } = user;

    const response = await insertFeedbackToActivityUseCase.execute({
        userId: id,
        feedbacks,
        studentOutputId: Number(outputId)
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
