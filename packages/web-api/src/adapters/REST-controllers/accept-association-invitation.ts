import {
  IAcceptAssociationInvitationUseCase
} from '@application/use-cases';
import { EditAssociationInvitationHTTPDefinition } from '@language-app/common-core';
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer
} from '@language-app/common-platform';


export const AcceptAssociationInvitationControllerFactory = ({
  acceptAssociationInvitationUseCase
}: {
  acceptAssociationInvitationUseCase: IAcceptAssociationInvitationUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, _, __, { user }) => {
    const {
      token,
    } = controllerSerializer(params, [
      'token'
    ]);

    await acceptAssociationInvitationUseCase.execute({
      userId: user.id,
      token
    })

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...EditAssociationInvitationHTTPDefinition,
    middlewares: ['auth']
  };
};
