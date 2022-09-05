import {
  IUserRepository,
  UserDTO
} from '@application/ports';
import { PrismaClient } from '@prisma-client';

export class UserRepository implements IUserRepository {
  prisma: PrismaClient;
  private _pageSize = 10;

  constructor() {
    this.prisma = new PrismaClient();
  }

  insertUserAndStudent(user: UserDTO, userId: string, studentId: string) {
    return this.prisma.user.create({
      data: {
        id: userId,
        email: user.email,
        name: user.name,
        role: user.role,
        tokenVersion: user.tokenVersion,
        student: {
          create: {
            id: studentId,
          }
        }
      }
    })
  }

  insertUserAndInstructor(user: UserDTO, userId: string, instructorId: string) {
    return this.prisma.user.create({
      data: {
        id: userId,
        email: user.email,
        name: user.name,
        role: user.role,
        tokenVersion: user.tokenVersion,
        instructor: {
          create: {
            id: instructorId,
          }
        }
      }
    })
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
