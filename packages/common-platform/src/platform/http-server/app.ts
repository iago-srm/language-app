import express, { Express, RequestHandler, ErrorRequestHandler } from 'express';
import 'express-async-errors';
import { RouteNotFoundError } from '@language-app/common';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
import { startPolyglot } from './polyglot-middleware';
import {
  Server as AbstractServer,
  IHTTPServerConstructorParams,
} from './server';
import { IHTTPControllerDescriptor } from '../ports';

interface IExpressConstructorParams extends IHTTPServerConstructorParams {
  controllers: IHTTPControllerDescriptor<RequestHandler>[];
  errorHandler: IHTTPControllerDescriptor<ErrorRequestHandler>;
  middlewares: { [key: string]: RequestHandler };
  baseUrn: string;
  translationMiddleware: any;
}

export class ExpressServer extends AbstractServer {
  _app: Express;
  baseUrn: string;
  _logger: any;

  constructor({
    logger,
    controllers,
    errorHandler,
    middlewares,
    baseUrn,
    translationMiddleware
  }: IExpressConstructorParams) {
    super({ logger });
    this._app = express();
    this.setupServer(this._app);
    this.baseUrn = baseUrn;

    // CORS
    const allowlist = process.env.CORS_ALLOW?.split(' ');
    const corsOptionsDelegate = function (req, callback) {
      let corsOptions;
      if (process.env.CORS_ALLOW === '*') {
        callback(null, { origin: true });
        return;
      }
      if (allowlist?.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false }; // disable CORS for this request
      }
      callback(null, corsOptions); // callback expects two parameters: error and options
    };
    this._app.use(cors(corsOptionsDelegate));

    //Middleware
    this._app.use(json());
    this._app.use(translationMiddleware);

    // Security
    this._app.use(helmet());
    this._app.disable('x-powered-by');

    const getPath = (path: string) => `${this.baseUrn}/${path}`;

    controllers.forEach((descriptor) => {
      if (descriptor.middlewares) {
        this._app[descriptor.method!](
          getPath(descriptor.path!),
          ...descriptor.middlewares.map(middleware => middlewares[middleware]),
          descriptor.controller
        );
      } else {
        this._app[descriptor.method!](
          getPath(descriptor.path!),
          descriptor.controller
        );
      }
    });

    this._app.all('*', () => {
      throw new RouteNotFoundError();
    });

    this._app.use(errorHandler.controller);

  }
}
