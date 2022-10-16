import { IVerificationTokenRepository } from '@application/ports';
import { PrismaClient } from '@prisma-client';

export class VerificationTokenRepository implements IVerificationTokenRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getTokenByTokenValue(token: string) {
    return this.prisma.verificationToken.findUnique({
      where: {
        token
      }
    })
  }

  insertToken(token: any) {
    return this.prisma.verificationToken.create({
      data: token
    })
  }

}
