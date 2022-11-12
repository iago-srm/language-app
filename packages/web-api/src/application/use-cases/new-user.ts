import { IUserRepository, IIdGenerator } from "../ports";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  authApiId: string;
  name: string;
  email: string;
  role: string;
  tokenVersion: number;
  image: string;
};
type Return = void;

export type INewUserUseCase = IUseCase<InputParams, Return>;

class UseCase implements INewUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private idService: IIdGenerator
  ) {}

  async execute({ authApiId, role, name, email, tokenVersion, image }) {
    // console.log({authApiId, role, email, name, tokenVersion, image})

    const newUser = {
      role,
      name,
      email,
      tokenVersion,
      authApiId,
      image,
    };

    const existingUser = await this.userRepository.getUserByAuthApiId(
      authApiId
    );
    if (existingUser)
      throw new Error("User with that authApiId already exists");

    if (role === "STUDENT")
      await this.userRepository.insertUserAndStudent(newUser, authApiId);
    else await this.userRepository.insertUserAndInstructor(newUser, authApiId);
  }
}

export default UseCase;
