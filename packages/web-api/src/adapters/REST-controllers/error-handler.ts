import {
  IHTTPErrorHandler,
  IHTTPControllerDescriptor,
} from '../ports/REST-controllers';
import { CustomError } from '@common/errors';

export const ErrorHandlerControllerFactory =
  (): IHTTPControllerDescriptor<IHTTPErrorHandler> => {
    const fn: IHTTPErrorHandler = async (error, translator) => {
      if (error instanceof CustomError) {
        return {
          statusCode: error.HTTPstatusCode || 500,
          response: {
            error: { message: translator(error.errorName, error.params) }
          }
        }
      };

      return {
        statusCode: 500,
        response: {
          errors: [{ message: error.toString() }],
        },
      };
    };

    return {
      controller: fn,
      path: 'error-handler',
    };
  };
