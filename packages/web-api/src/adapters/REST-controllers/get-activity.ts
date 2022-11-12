import { IGetActivityUseCase } from "@application/use-cases";
import { GetActivityHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const GetActivityControllerFactory = ({
  getActivityUseCase,
}: {
  getActivityUseCase: IGetActivityUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, _, __, { user }) => {
    const { id: stringId } = controllerSerializer(params, [{ name: "id" }]);

    const { id: userId, role } = user;

    const activityId = Number(stringId);

    if (isNaN(activityId)) throw new Error("activity id must be a number");

    return {
      response: await getActivityUseCase.execute({
        activityId,
        userId,
        role,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...GetActivityHTTPDefinition,
    middlewares: ["auth"],
  };
};
