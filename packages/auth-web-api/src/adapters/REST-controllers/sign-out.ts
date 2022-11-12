import { ISignOutUseCase } from "@application/use-cases";
import { SignOutHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from "@language-app/common-platform";

export const SignOutControllerFactory = ({
  signOutUseCase,
}: {
  signOutUseCase: ISignOutUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, ___, { user }) => {
    const { id, tokenVersion } = user;

    await signOutUseCase.execute({
      id,
      tokenVersion,
    });

    return {
      response: "",
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: SignOutHTTPDefinition.method,
    path: SignOutHTTPDefinition.path,
    middlewares: ["auth"],
  };
};
