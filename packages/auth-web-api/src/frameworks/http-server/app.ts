import express, { Express, RequestHandler, ErrorRequestHandler } from 'express';
import 'express-async-errors';
import { RouteNotFoundError } from '@language-app/common';
import helmet from 'helmet';
import cors from 'cors';
import { json } from 'body-parser';
// import { errorHandler } from './error-handler';
import { startPolyglot } from './polyglot-middleware';
import { Messages } from '@/common/locale';
import {
    Server as AbstractServer,
    IHTTPServerConstructorParams,
} from './server';
import { IHTTPControllerDescriptor } from '@adapters/REST-controllers';

interface IExpressConstructorParams extends IHTTPServerConstructorParams {
    controllers: IHTTPControllerDescriptor<RequestHandler>[];
    errorHandlers: IHTTPControllerDescriptor<ErrorRequestHandler>[];
    middlewares: { [key: string]: RequestHandler }
}

export class ExpressServer extends AbstractServer {
    _app: Express;
    baseUrn = 'api/v1';
    _logger: any;

    constructor({ logger, controllers, errorHandlers, middlewares }: IExpressConstructorParams) {

        super({ logger });
        this._app = express();
        this.setupServer(this._app);

        // CORS
        const allowlist = process.env.CORS_ALLOW?.split(' ');
        const corsOptionsDelegate = function (req, callback) {
            let corsOptions;
            // console.log(allow)
            if(process.env.CORS_ALLOW === '*') {
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
        this._app.use(startPolyglot(Messages));

        // Security
        this._app.use(helmet());
        this._app.disable('x-powered-by');

        // this._app.use(middlewares["auth"]);

        controllers.forEach((descriptor) => {
            if(descriptor.middleware) {
                this._app[descriptor.method!](
                    descriptor.path!,
                    middlewares[descriptor.middleware],
                    descriptor.controller
                )
            } else {
                this._app[descriptor.method!](
                    descriptor.path!,
                    descriptor.controller
                )
            }

        });

        this._app.all('*', () => {
            throw new RouteNotFoundError();
        });

        // this._app.use((error, _, __, ___) => {
        //     console.log('test error',error)
        // })
        errorHandlers.map(errorHandler => {
            this._app.use(errorHandler.controller)
        });
    }
}
