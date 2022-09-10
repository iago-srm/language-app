import {
    IUserRepository,
    ITokenService,
    UserDTO
  } from '../ports';
  import {
    InvalidCredentialsError,
  } from '@common/errors';
  import {
    IGoogleSignInAPI,
  } from '@language-app/common-core';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = IGoogleSignInAPI["params"];
  type Return = IGoogleSignInAPI["response"];
  
  export type IGoogleSignInUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGoogleSignInUseCase {
  
    constructor(
      private userRepository: IUserRepository,
      private tokenService: ITokenService,
    ) {}
  
    async execute({ id }) {
      let userDTO: UserDTO;
  
    userDTO = await this.userRepository.getUserById(id);
    if(!userDTO) throw new InvalidCredentialsError();

      const token = this.tokenService.generate({
        id: userDTO.id || '',
        tokenVersion: userDTO.tokenVersion,
      });
  
      return {
        token,
      };
    };
  };
  
  export default UseCase;
  