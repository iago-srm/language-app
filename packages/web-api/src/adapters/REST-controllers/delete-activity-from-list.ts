import { DeleteActivityFromStudentListUseCase } from "@application/use-cases";
import { DeleteActivityFromStudentListHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";
import { MustBeStudentToAddToListError } from "@common/errors";

export const DeleteActivityFromStudentListControllerFactory = ({
  deleteActivityFromStudentListUseCase,
}: {
  deleteActivityFromStudentListUseCase: DeleteActivityFromStudentListUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, body, __, { user }) => {
    const { activityId } = controllerSerializer(body, ["activityId"]) as any;

    const { id, role } = user;

    if (role !== "STUDENT") {
      throw new MustBeStudentToAddToListError();
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
