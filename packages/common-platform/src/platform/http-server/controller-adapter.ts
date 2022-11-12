import { Request, Response, NextFunction } from "express";
import { IHTTPController, IHTTPErrorHandler, IHTTPMiddleware } from "../ports";
import { IHTTPFrameworkAdapter } from "./server";
import { HeaderParser } from "./headers";

export class ExpressControllerAdapter implements IHTTPFrameworkAdapter {
  adaptControllerFunction(fn: IHTTPController) {
    return async function (req: Request, res: Response) {
      const { response, statusCode } = await fn(
        req.params,
        req.body,
        req.query,
        {
          // this is placed here by the auth middleware.
          // It is then passed along to all requests that run after this middleware.
          user: (req as any).user,
          // just in case
          req,
          // for endpoints that receive files
          file: req.file,
          // for endpoints that need the client's language
          language: HeaderParser.getPreferredLanguage(req),
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
}
