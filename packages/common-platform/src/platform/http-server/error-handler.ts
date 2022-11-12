import { IHTTPErrorHandler, IHTTPControllerDescriptor } from "../ports";
import { CustomError } from "@language-app/common-utils";
import { handlePrismaError } from "./prisma-error-handler";

export const ErrorHandlerControllerFactory =
  ({}): IHTTPControllerDescriptor<IHTTPErrorHandler> => {
    const fn: IHTTPErrorHandler = async (e, translator) => {
      const error = handlePrismaError(e);
      if (error instanceof CustomError) {
        return {
          statusCode: error.HTTPstatusCode || 500,
          response: { message: translator(error.errorName, error.params) },
        };
      }
      return {
        statusCode: 500,
        response: {
          message: error.toString(),
        },
      };
    };

    return {
      controller: fn,
    };
  };
