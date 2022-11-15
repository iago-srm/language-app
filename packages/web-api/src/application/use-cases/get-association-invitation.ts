import { IAssociationInvitationRepository, InstructorDTO } from "../ports";
import { UserNotFoundError } from "@common/errors";
import {
  IForgotPasswordParams,
  IForgotPasswordResponse,
} from "@language-app/common-core";
import { IUseCase } from "@language-app/common-platform";

type InputParams = {
  token: string;
};
type Return = {
  instructor: Partial<InstructorDTO>;
};

export type IGetAssociationInvitationUseCase = IUseCase<InputParams, Return>;

class UseCase implements IGetAssociationInvitationUseCase {
  constructor(
    private associationInvitationTokenRepository: IAssociationInvitationRepository
  ) {}

  async execute({ token }) {
    const instructor =
      await this.associationInvitationTokenRepository.getInstructorByTokenValue(
        token
      );
    if (!instructor) throw new UserNotFoundError();

    return {
      instructor,
    };
  }
}

export default UseCase;
