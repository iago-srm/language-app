import {
  IProfileImageRepository,
  IUseCase,
  IUserRepository,
} from '../ports';
import {
  UserNotFoundError,
  InvalidRoleError
} from '@common/errors';


type InputParams = {
  file: any;
  userId: string;
};
type Return = void;

export type IUpdateProfileImageUseCase = IUseCase<InputParams, Return>;

class UseCase implements IUpdateProfileImageUseCase {
  constructor (
    private userRepository: IUserRepository,
    private profileImageRepository: IProfileImageRepository
  ){}
  async execute({ file, userId }) {

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new UserNotFoundError();

    const imageUrl = await this.profileImageRepository.uploadProfileImage(file, userId);

    await this.userRepository.updateUser(userId, {
      image: imageUrl
    });
  }

}

export default UseCase;
