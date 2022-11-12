import { HTTPDefinition } from "@language-app/common-core";

export interface ITokenService {
  generate: (payload: any) => string;
  verify: (token: string) => Promise<any>;
}

export interface IIdGenerator {
  getId: () => string;
}

export interface IEncryptionService {
  encrypt: (plain: string) => Promise<string>;
  compare: (plain: string, hash: string) => Promise<boolean>;
}

type EmailBody = {
  text?: string;
  html?: string;
};

export interface IEmailService {
  sendEmail: (to: string, subject: string, body: EmailBody) => Promise<boolean>;
}

export interface IStorageService {
  uploadFile: (
    file: any,
    fileName: string,
    bucketName: string
  ) => Promise<boolean>;
}

export interface IQueueService {
  sendMessage: (
    message: any,
    queueUrl: string,
    destinationEndpoint?: HTTPDefinition
  ) => Promise<boolean>;
}
