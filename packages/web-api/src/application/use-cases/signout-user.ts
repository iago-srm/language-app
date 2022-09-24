import {
    IUserRepository,
  } from '../ports';
  import {
    IUseCase
  } from '@language-app/common-platform';
  
  type InputParams = {
    authApiId: string;
    tokenVersion: number;
  };
  type Return = void;
  
  export type ISignOutUserUseCase = IUseCase<InputParams, Return>;
  
  class UseCase implements ISignOutUserUseCase {
  
    constructor(
      private userRepository: IUserRepository,
    ){}
  
    // new tokenVersion comes from auth API
    async execute ({ authApiId, tokenVersion }) {
  
      const user = await this.userRepository.getUserByAuthApiId(authApiId);
      if(!user) throw new Error(`User with authApiId ${authApiId} does not exist`);
  
      await this.userRepository.updateUser({
        tokenVersion
      }, authApiId);
    }
  
  };
  
  export default UseCase;
  