import { IUpdateUserUseCase } from "@application/use-cases";
import { AuthUpdateUserHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const UpdateUserControllerFactory = ({
  updateUserUseCase,
}: {
  updateUserUseCase: IUpdateUserUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, ___, { user }) => {
    const { name, role } = controllerSerializer(body, [
      { name: "name", optional: true },
      { name: "role", optional: true },
    ]);

    await updateUserUseCase.execute({
      role: role as any,
      name: name as any,
      userId: user.id,
    });

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...AuthUpdateUserHTTPDefinition,
    middlewares: ["auth"],
  };
};
