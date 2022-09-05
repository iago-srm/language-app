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
            }
        })
    };
  }
  