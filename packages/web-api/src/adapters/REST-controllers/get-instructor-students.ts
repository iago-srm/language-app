import { IGetInstructorStudentsUseCase } from "@application/use-cases";
import { GetInstructorStudentsHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
} from "@language-app/common-platform";

export const GetInstructorStudentsControllerFactory = ({
  getInstructorStudentsUseCase,
}: {
  getInstructorStudentsUseCase: IGetInstructorStudentsUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (params, _, __, { user }) => {
    return {
      response: await getInstructorStudentsUseCase.execute({
        userId: user.id,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    ...GetInstructorStudentsHTTPDefinition,
    middlewares: ["auth"],
  };
};
