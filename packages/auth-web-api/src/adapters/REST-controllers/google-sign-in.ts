import { IGoogleSignInUseCase } from "@application/use-cases";
import { GoogleSignInHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const GoogleSignInControllerFactory = ({
  googleSignInUseCase,
}: {
  googleSignInUseCase: IGoogleSignInUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body) => {
    const { email } = controllerSerializer(body, ["email"]);

    return {
      response: await googleSignInUseCase.execute({
        email,
      }),
      statusCode: 201,
    };
  };

  return {
    controller: fn,
    ...GoogleSignInHTTPDefinition,
  };
};
