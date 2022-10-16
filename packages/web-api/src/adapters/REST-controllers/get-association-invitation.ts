import {
    IGetAssociationInvitationUseCase,
} from '@application/use-cases';
import { GetAssociationInvitationHTTPDefinition } from '@language-app/common-core';
import {
    IHTTPController,
    IHTTPControllerDescriptor,
    controllerSerializer
} from '@language-app/common-platform';

export const GetAssociationInvitationControllerFactory = ({
    getAssociationInvitationUseCase,
}: {
    getAssociationInvitationUseCase: IGetAssociationInvitationUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
const fn: IHTTPController = async (params) => {

    const {
        token
    } = controllerSerializer(params, ['token']);

    return {
    response: await getAssociationInvitationUseCase.execute({
        token
    }),
    statusCode: 200,
    };
};

return {
    controller: fn,
    ...GetAssociationInvitationHTTPDefinition,
    middlewares: ['auth']
};
};
