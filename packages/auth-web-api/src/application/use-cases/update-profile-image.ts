import {
  IProfileImageRepository,
  IUserRepository,
  IAuthEventQueue
} from '../ports';
import {
  UserNotFoundError,
} from '@common/errors';
import {
  IUseCase
} from '@language-app/common-platform';

type InputParams = {
  file: any;
  userId: string;
};
type Return = void;

export type IUpdateProfileImageUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateProfileImageUseCase {
  constructor (
    private userRepository: IUserRepository,
    private profileImageRepository: IProfileImageRepository,
    private authEventQueue: IAuthEventQueue
  ){}
  async execute({ file, userId }) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    const imageUrl = await this.profileImageRepository.uploadProfileImage(file, userId);
    
    await this.userRepository.updateUser(userId, {
      image: imageUrl
    });

    await this.authEventQueue.updateUser({
      authApiId: user.id,
      image: imageUrl
    });
  }

}

export default UseCase;
