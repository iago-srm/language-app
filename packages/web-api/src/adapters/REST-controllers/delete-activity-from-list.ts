import { DeleteActivityFromStudentListUseCase } from "@application/use-cases";
import { DeleteActivityFromStudentListHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const DeleteActivityFromStudentListControllerFactory = ({
  deleteActivityFromStudentListUseCase,
}: {
  deleteActivityFromStudentListUseCase: DeleteActivityFromStudentListUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, __, { user }) => {
    const { activityId } = controllerSerializer(body, ["activityId"]) as any;

    const { id, role } = user;

    if (role !== "STUDENT") {
      throw new Error("Must be a student to start or complete activity");
    }

    return {
      response: await deleteActivityFromStudentListUseCase.execute({
        userId: id,
        activityId,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...DeleteActivityFromStudentListHTTPDefinition,
    middlewares: ["auth"],
  };
};
