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

    if (!headers.authorization) throw new MissingTokenError();

    const [header, token] = headers.authorization.split(' ');
    if (header !== 'Bearer') throw new MalformedTokenError();

    const tokenPayload = await tokenService.verify(token);

    if(!Object.keys(tokenPayload).includes('id') ||
      !Object.keys(tokenPayload).includes('tokenVersion'))
        throw new MalformedTokenError();

    const userDTO = await userRepository.getUserById(tokenPayload.id);

    if (!userDTO) throw new InvalidCredentialsError();

    if (userDTO.tokenVersion !== tokenPayload.tokenVersion) throw new Forbidden();

    req.user = {
      id: userDTO.id,
      email: userDTO.email,
      name: userDTO.name,
      role: userDTO.role
    };
  };

  return {
    controller: fn,
  };
};
