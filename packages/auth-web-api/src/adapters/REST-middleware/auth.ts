import {
  ITokenService,
  IUserRepository
} from '@application/ports';
import {
  IHTTPMiddleware,
  IHTTPControllerDescriptor,
} from '../ports/REST-controllers';
import {
  MissingTokenError,
  MalformedTokenError,
  InvalidCredentialsError,
  Forbidden
} from '@language-app/common';

type Dependencies = {
  userRepository: IUserRepository;
  tokenService: ITokenService;
};

export const AuthenticationMiddlewareControllerFactory = ({
  tokenService,
  userRepository
}: Dependencies): IHTTPControllerDescriptor<IHTTPMiddleware> => {
  const fn: IHTTPMiddleware = async (req, headers) => {

    console.log('middleware',headers)
    if (!headers.authorization) throw new MissingTokenError();

    const [header, token] = headers.authorization.split(' ');
    if (header !== 'Bearer') throw new MalformedTokenError();

    const { id, tokenVersion } = await tokenService.verify(token);

    if(!id || !tokenVersion) throw new MalformedTokenError();

    const userDTO = await userRepository.getUserById(id);

    if (!userDTO) {
      throw new InvalidCredentialsError();
    }

    if (userDTO.tokenVersion !== tokenVersion) throw new Forbidden();

    req.user = userDTO;
  };

  return {
    controller: fn,
  };
};
