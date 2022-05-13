import { ITokenService } from '@application/ports';
import {
  IHTTPMiddleware,
  IHTTPControllerDescriptor,
} from '../ports/REST-controllers';
import { MissingTokenError, MalformedTokenError } from '@language-app/common';

export const AuthenticationMiddlewareControllerFactory = ({
  tokenService,
}: {
  tokenService: ITokenService;
}): IHTTPControllerDescriptor<IHTTPMiddleware> => {
  const fn: IHTTPMiddleware = async (req, headers) => {
    if (!headers.authorization) throw new MissingTokenError();
    const [header, token] = headers.authorization.split(' ');
    if (header !== 'Bearer') throw new MalformedTokenError();
    const user = await tokenService.verify(token);
    req.user = user;
  };

  return {
    controller: fn,
  };
};
