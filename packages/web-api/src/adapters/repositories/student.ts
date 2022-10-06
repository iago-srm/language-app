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

    async getStudentByUserEmail (email: string) {
      return (await this.prisma.student.findMany({
        where: {
          user: {
            email
          }
        }
      }))[0]
    }

    assignInstructor (studentId: string, instructorId: string) {
      return this.prisma.student.update({
        where: {
          id: studentId
        },
        data: {
          instructor: {
            connect: {
              id: instructorId
            }
          }
        }
      })
    };
  }
  