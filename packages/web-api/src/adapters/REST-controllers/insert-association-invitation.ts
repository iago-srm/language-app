import { INewAssociationInvitationUseCase } from "@application/use-cases";
import { InsertAssociationInvitationHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const InsertAssociationInvitationControllerFactory = ({
  insertAssociationInvitationUseCase,
}: {
  insertAssociationInvitationUseCase: INewAssociationInvitationUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { language, user }) => {
    const { email } = controllerSerializer(body, ["email"]);

    const { id } = user;

    const response = await insertAssociationInvitationUseCase.execute({
      studentEmail: email,
      userId: id,
      language,
    });

    return {
      response,
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...InsertAssociationInvitationHTTPDefinition,
    middlewares: ["auth"],
  };
};
