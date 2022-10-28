import {
    IInstructorRepository,
    InstructorDTO
  } from '@application/ports';
  import { PrismaClient } from '@prisma-client';
  
  export class InstructorRepository implements IInstructorRepository {
    prisma: PrismaClient;
    private _pageSize = 10;
  
    constructor() {
      this.prisma = new PrismaClient();
    }

    getInstructorByUserId (userId: string) {
        return this.prisma.instructor.findUnique({
            where: {
                userId
            },
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
        })
    };

    // async getThisInstructorStudentIds (instructorId: string) {
    //   return (await this.prisma.instructor.findUnique({
    //     where: {
    //       id: instructorId
    //     },
    //     include: {
    //       students: {
    //         select: {
    //           id: true,
    //         }
    //       }
    //     }
    //   })).students.map(std => std.id)
    // }
  

  async getThisInstructorStudents (instructorId: string) {
    return (await this.prisma.instructor.findUnique({
      where: {
        id: instructorId
      },
      include: {
        students: {
          include: {
            user: {
              select: {
                name: true
              }
            },
          }
        }
      }
    })).students.map(std => ({ id: std.id, name: std.user.name }))
  }
}
  