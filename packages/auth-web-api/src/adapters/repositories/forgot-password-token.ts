import {
  IForgotPasswordTokenRepository,
  VerificationTokenDTO
} from '@application/ports';
import { PrismaClient } from '@prisma/client';

export class ForgotPasswordTokenRepository implements IForgotPasswordTokenRepository {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getTokenByTokenValue(token: string) {
    return this.prisma.forgotPasswordToken.findUnique({
      where: {
        token
      }
    })
  }

  insertToken(token: any) {
    return this.prisma.forgotPasswordToken.create({
      data: token
    })
  }

  invalidateToken(token: any) {
    return this.prisma.forgotPasswordToken.update({
      where: { id: token.id },
      data: {
        expiresAt: new Date(Date.now())
      }
    })
  }

}
