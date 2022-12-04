import { IGetActivityUseCase } from "@application/use-cases";
import { GetActivityOpenHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const GetActivityOpenControllerFactory = ({
  getActivityUseCase,
}: {
  getActivityUseCase: IGetActivityUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, _, __) => {
    const { id: stringId } = controllerSerializer(params, [{ name: "id" }]);

    const activityId = Number(stringId);

    if (isNaN(activityId)) throw new Error("activity id must be a number");

    return {
      response: await getActivityUseCase.execute({
        activityId,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...GetActivityOpenHTTPDefinition,
  };
};
