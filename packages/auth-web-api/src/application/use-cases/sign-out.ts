import { IUserRepository, IAuthEventQueue } from "../ports";
import { IUseCase } from "@language-app/common-platform";
import { ITokenContent } from "@language-app/common-core";

type InputParams = ITokenContent;
type Return = void;

export type ISignOutUseCase = IUseCase<InputParams, Return>;

class UseCase implements ISignOutUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authEventQueue: IAuthEventQueue
  ) {}

  async execute({ id, tokenVersion }) {
    const userDTO = await this.userRepository.getUserById(id);

    const newTokenVersion = tokenVersion + 1;
    if (userDTO.tokenVersion === tokenVersion) {
      await this.userRepository.updateUser(id, {
        tokenVersion: newTokenVersion,
      });
    }

    await this.authEventQueue.updateUser({
      authApiId: id,
      tokenVersion: newTokenVersion,
    });
  }
}

export default UseCase;
