import { IVerificationTokenRepository, VerificationTokenDTO } from '@application/ports';
import { PrismaClient } from '@prisma/client';

export class VerificationTokenRepository implements IVerificationTokenRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getTokenByUserId(id: string) {
    return this.prisma.verificationToken.findUnique({
      where: {
        userId: id
      }
    })
  }

  insertToken(token: any) {
    return this.prisma.verificationToken.create({
      data: token
    })
  }

}
