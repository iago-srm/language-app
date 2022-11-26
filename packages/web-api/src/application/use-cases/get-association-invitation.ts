import {
  IAssociationInvitationRepository,
  InstructorDTO,
  UserDTO,
} from "../ports";
import { UserNotFoundError } from "@common/errors";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  token: string;
};
type Return = {
  accepted: boolean;
  token: string;
  instructor: Partial<InstructorDTO | { user: Partial<UserDTO> }>;
};

export type IGetAssociationInvitationUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetAssociationInvitationUseCase {
  constructor(
    private associationInvitationTokenRepository: IAssociationInvitationRepository
  ) {}

  async execute({ token }) {
    const tokenInfo =
      await this.associationInvitationTokenRepository.getTokenByTokenValue(
        token
      );
    if (!tokenInfo) throw new UserNotFoundError();

    return tokenInfo;
  }
}

export default UseCase;
