import {
    IStudentRepository,
  } from '@application/ports';
  import { PrismaClient } from '@prisma-client';
  
  export class StudentRepository implements IStudentRepository {
    prisma: PrismaClient;
  
    constructor() {
      this.prisma = new PrismaClient();
    }

    getStudentByUserId (userId: string) {
        return this.prisma.student.findUnique({
            where: {
                userId
            }
        })
    };
  }
  