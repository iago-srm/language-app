import { InsertActivityIntoStudentListUseCase } from "@application/use-cases";
import { InsertActivityIntoStudentListHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";
import { MustBeStudentToAddToListError } from "@common/errors";

export const InsertActivityListControllerFactory = ({
  insertActivityListUseCase,
}: {
  insertActivityListUseCase: InsertActivityIntoStudentListUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, __, { user }) => {
    const { activityId } = controllerSerializer(body, ["activityId"]) as any;

    const { id, role } = user;

    if (role !== "STUDENT") {
      throw new MustBeStudentToAddToListError();
    }

    return {
      response: await insertActivityListUseCase.execute({
        userId: id,
        activityId,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...InsertActivityIntoStudentListHTTPDefinition,
    middlewares: ["auth"],
  };
};
