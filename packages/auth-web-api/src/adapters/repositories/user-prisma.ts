import { IUserRepository, UserDTO } from "@application/ports";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements IUserRepository {

  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async insertUser(user: UserDTO) {
    return this.prisma.user.create({
      data: user
    })
  }

  updateUser(id: string, user: UserDTO) {
    return this.prisma.user.update({
      where: { id },
      data: user
    })
  }
}
