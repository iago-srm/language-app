import {
    IUserRepository,
    UserDTO,
    IIdGenerator,
    IProfileImageRepository,
  } from '../ports';
  import {
    IGoogleSignUpAPI,
  } from '@language-app/common-core';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = IGoogleSignUpAPI["params"];
  type Return = IGoogleSignUpAPI["response"];
  
  export type IGoogleSignUpUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IGoogleSignUpUseCase {
  
    constructor (
      private userRepository: IUserRepository,
      private profileImageRepository: IProfileImageRepository
    ){}
  
    async execute({ id, email, name, image }) {
  
      const existingUser = await this.userRepository.getUserByEmail(email);
  
      if (existingUser) return;
  
      const userDTO: UserDTO = {
        id,
        email,
        name,
        image,
        emailVerified: true,
        tokenVersion: 0,
        provider: "google"
      };
  
      await this.userRepository.insertUser(userDTO);

    }
  
  }
  
  export default UseCase;
  