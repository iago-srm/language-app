import { Request, Response, NextFunction } from 'express';
import {
  IHTTPController,
  IHTTPErrorHandler,
  IHTTPControllerPathDescriptor,
  IHTTPMiddleware,
} from '@adapters/REST-controllers';
import { IHTTPFrameworkAdapter } from './server';

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
  adaptControllerFunction(fn: IHTTPController) {
    return async function (req: Request, res: Response) {
      const { response, statusCode } = await fn(
        req.params,
        req.body,
        req.query,
        {
          auth: req.headers.auth[0],
          user: (req as any).user,
        }
      );
      res.status(statusCode).json(response);
    };
  }

  adaptErrorControllerFunction(fn: IHTTPErrorHandler) {
    return async function (
      error: Error,
      req: any,
      res: Response,
      next: NextFunction
    ) {
      // console.log(error, req.polyglot.t)
      const { response, statusCode } = await fn(
        error,
        req.polyglot.t.bind(req.polyglot)
      );
      res.status(statusCode).json(response);
      next();
    };
  }

  adaptMiddlewareControllerFunction(fn: IHTTPMiddleware) {
    return async function (req: Request, _: Response, next: NextFunction) {
      await fn(req, req.headers);
      next();
    };
  }
  adaptPath() {
    return '';
  }
}
