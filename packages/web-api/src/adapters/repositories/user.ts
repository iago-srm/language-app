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

  insertUserAndStudent(user: UserDTO, id: string) {
    return this.prisma.user.create({
      data: {
        id,
        email: user.email,
        name: user.name,
        role: user.role,
        student: {
          create: {
            id,
          }
        }
      }
    })
  }

  insertUserAndInstructor(user: UserDTO, id: string) {
    return this.prisma.user.create({
      data: {
        id,
        email: user.email,
        name: user.name,
        role: user.role,
        instructor: {
          create: {
            id,
          }
        }
      }
    })
  }
}
