import * as awilix from "awilix";
import {
  ExpressControllerAdapter,
  ExpressServer as FrameworkServer,
  ErrorHandlerControllerFactory,
} from "..";
import { getControllers } from ".";
import { AuthenticationMiddlewareControllerFactory } from "../auth-middleware";

const expressAdapter = new ExpressControllerAdapter();

export const registerServer = (
  container: awilix.AwilixContainer,
  baseUrn: string,
  translationMiddleware: any
) => {
  container.register({
    authMiddleware: awilix.asFunction(
      AuthenticationMiddlewareControllerFactory
    ),
    errorHandler: awilix.asFunction(ErrorHandlerControllerFactory),
    server: awilix
      .asClass(FrameworkServer)
      .singleton()
      .inject((container: awilix.AwilixContainer) => {
        return {
          controllers: getControllers(container).map(
            ({ controller, method, middlewares, path }) => {
              return {
                middlewares,
                method,
                controller: expressAdapter.adaptControllerFunction(controller),
                path,
              };
            }
          ),
          logger: { info: console.log, error: console.error },
          middlewares: {
            auth: expressAdapter.adaptMiddlewareControllerFunction(
              container.resolve("authMiddleware").controller
            ),
            file: container.resolve("fileMiddleware"),
          },
          errorHandler: {
            controller: expressAdapter.adaptErrorControllerFunction(
              container.resolve("errorHandler").controller
            ),
          },
          baseUrn,
          translationMiddleware,
        };
      }),
  });
};
