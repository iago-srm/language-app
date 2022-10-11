import {
  ITokenService,
} from '../ports';
import {
  IHTTPMiddleware,
  IHTTPControllerDescriptor,
} from '@language-app/common-platform';
import {
  MissingTokenError,
  MalformedTokenError,
  Forbidden,
  CouldNotVerifyTokenError,
  InsufficientTokenError,
  UserNotFoundError
} from '@language-app/common-utils';

type Dependencies = {
  userRepository: any; // TODO
  tokenService: ITokenService;
};

export const AuthenticationMiddlewareControllerFactory = ({
  tokenService,
  userRepository
}: Dependencies): IHTTPControllerDescriptor<IHTTPMiddleware> => {
  const fn: IHTTPMiddleware = async (req, headers) => {

    // console.log(headers.authorization)
    if (!headers.authorization) throw new MissingTokenError();

    const [header, token] = headers.authorization.split(' ');
    if (header !== 'Bearer') throw new MalformedTokenError();

    let tokenPayload;
    try {
      tokenPayload = await tokenService.verify(token);
    } catch(e) {
      console.log("token verification error:",e)
      throw new CouldNotVerifyTokenError();
    }

    if(!Object.keys(tokenPayload).includes('id') ||
      !Object.keys(tokenPayload).includes('tokenVersion') ||
        isNaN(Number(tokenPayload.tokenVersion)))
          throw new InsufficientTokenError();

    const userDTO = await userRepository.getUserById(tokenPayload.id);

    if (!userDTO) throw new UserNotFoundError();

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
