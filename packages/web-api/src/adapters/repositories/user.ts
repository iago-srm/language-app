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

  insertUserAndStudent(user: UserDTO, newId: string) {
    return this.prisma.user.create({
      data: {
        id: newId,
        authApiId: user.authApiId,
        email: user.email,
        name: user.name,
        role: user.role,
        tokenVersion: user.tokenVersion,
        image: user.image,
        student: {
          create: {
            id: newId
          }
        }
      }
    })
  }

  insertUserAndInstructor(user: UserDTO, newId: string) {
    return this.prisma.user.create({
      data: {
        id: newId,
        authApiId: user.authApiId,
        email: user.email,
        name: user.name,
        role: user.role,
        tokenVersion: user.tokenVersion,
        image: user.image,
        instructor: {
          create: {
            id: newId,
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

  getUserByAuthApiId(authApiId: string) {
    return this.prisma.user.findUnique({
      where: {
        authApiId,
      },
    });
  }

  updateUser(user: Partial<UserDTO>, authApiId: string) {
    return this.prisma.user.update({
      data: {
        ...user
      },
      where: {
        authApiId
      }
    })
  }
}
