import {
  ITokenService,
  // IUserRepository
} from '../ports';
import {
  IHTTPMiddleware,
  IHTTPControllerDescriptor,
} from '@language-app/common';
import {
  MissingTokenError,
  MalformedTokenError,
  Forbidden
} from '@language-app/common';

type Dependencies = {
  userRepository: any; // TODO
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
      !Object.keys(tokenPayload).includes('tokenVersion') ||
        isNaN(Number(tokenPayload.tokenVersion)))
          throw new MalformedTokenError();

    const userDTO = await userRepository.getUserById(tokenPayload.id);

    if (!userDTO) throw new MalformedTokenError();

    if (userDTO.tokenVersion !== tokenPayload.tokenVersion) throw new Forbidden();

    req.user = {
      id: userDTO.id,
      tokenVersion: userDTO.tokenVersion,
      email: userDTO.email,
      name: userDTO.name,
      role: userDTO.role,
      image: userDTO.image
    };
  };

  return {
    controller: fn,
  };
};
