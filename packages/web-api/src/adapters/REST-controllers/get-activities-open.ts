import { IGetActivitiesUseCase } from "@application/use-cases";
import { GetActivitiesOpenHTTPDefinition } from "@language-app/common-core";
import {
  IHTTPController,
  IHTTPControllerDescriptor,
  controllerSerializer,
} from "@language-app/common-platform";

export const GetActivitiesOpenControllerFactory = ({
  getActivitiesUseCase,
}: {
  getActivitiesUseCase: IGetActivitiesUseCase;
}): IHTTPControllerDescriptor<IHTTPController> => {
  const fn: IHTTPController = async (_, __, query) => {
    const { title, cefr, topics, contentTypes, cursor, pageSize } =
      controllerSerializer(query, [
        { name: "title", optional: true },
        { name: "cefr", optional: true },
        { name: "cursor", optional: true },
        { name: "pageSize", optional: true },
        { name: "topics", optional: true, type: "array" },
        { name: "contentTypes", optional: true, type: "array" },
      ]);

    if (cursor && isNaN(Number(cursor)))
      throw new Error("cursor must be a number");
    if (pageSize && isNaN(Number(pageSize)))
      throw new Error("pageSize must be a number");

    return {
      response: await getActivitiesUseCase.execute({
        cursor: cursor && Number(cursor),
        pageSize: pageSize && Number(pageSize),
        title,
        cefr,
        topics,
        contentTypes,
      }),
      statusCode: 200,
    };
  };

  return {
    controller: fn,
    method: GetActivitiesOpenHTTPDefinition.method,
    path: GetActivitiesOpenHTTPDefinition.path,
  };
};
