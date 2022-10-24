import {
    IUserRepository,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    authApiId: string;
    tokenVersion?: number;
    image?: string;
  };
  type Return = void;
  
  export type IUpdateUserUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements IUpdateUserUseCase {
  
    constructor(
      private userRepository: IUserRepository,
    ){}
  
    // new tokenVersion comes from auth API
    async execute ({ authApiId, tokenVersion, image }) {
  
      const user = await this.userRepository.getUserByAuthApiId(authApiId);
      if(!user) throw new Error(`User with authApiId ${authApiId} does not exist`);
  
      await this.userRepository.updateUser({
        tokenVersion: tokenVersion || undefined,
        image
      }, authApiId);
    }
  
  };
  
  export default UseCase;
  