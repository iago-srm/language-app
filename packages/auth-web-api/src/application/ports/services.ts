import {
  ITokenService as ICommonTokenService,
  IIdGenerator as ICommonIdGenerator,
  IEncryptionService as ICommonEncryptionService,
} from "@language-app/common-platform";
import { UserDTO } from "./dtos";

export interface ITokenService extends ICommonTokenService {}

export interface IIdGenerator extends ICommonIdGenerator {}

export interface IEncryptionService extends ICommonEncryptionService {}

type SendEmailArgs = {
  destination: string;
  language: string;
  url: string;
};
export interface IAuthEmailService {
  sendForgotPasswordEmail: (args: SendEmailArgs) => Promise<any>;
  sendVerifyAccountEmail: (args: SendEmailArgs) => Promise<any>;
}

export interface IAuthEventQueue {
  publishNewUser: (args: Partial<UserDTO>) => Promise<any>;
  updateUser: (args: {
    authApiId: string;
    tokenVersion?: string;
    image?: string;
  }) => Promise<any>;
}
