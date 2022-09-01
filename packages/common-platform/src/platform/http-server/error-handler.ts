import {
  IHTTPErrorHandler,
  IHTTPControllerDescriptor,
} from '../ports';
import { CustomError } from '@language-app/common-utils';

export const ErrorHandlerControllerFactory =
  ({}): IHTTPControllerDescriptor<IHTTPErrorHandler> => {
    const fn: IHTTPErrorHandler = async (error, translator) => {
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
