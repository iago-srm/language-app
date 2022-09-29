import {
    ActivityDTO,
    ActivityInstructionDTO,
    CEFR,
    IStudentOutputRepository,
    StudentOutputDTO
  } from '@application/ports';
  import { PrismaClient } from '@prisma-client';
  
  export class StudentOutputRepository implements IStudentOutputRepository {
    prisma: PrismaClient;
    private _pageSize = 10;
  
    constructor() {
      this.prisma = new PrismaClient();
    }

    getStudentOutputById (id: number) {
      return this.prisma.studentOutput.findUnique({
        where: {
          id
        }, include: {
          answers: true
        }
      })
    }

    getStudentOutputsByStudentId (id: string) {
      return this.prisma.studentOutput.findMany({
        where: {
          studentId: id
        }, 
        include: {
          activity: {
            select: {
              cefr: true,
              timeToComplete: true,
              topics: true,
              contentType: true
            }
          }
        }
      })
    }

    insertStudentOutput ({
      answers,
      feedback: {
        grade,
        message
      }
    }: StudentOutputDTO) {
      return this.prisma.studentOutput.create({
        data: {
          answers: {
            create: 
            // [
            //   {answer: '', instruction: { connect: {id: ''}}}
            // ]
            answers.map(answer => ({
              // textAnswer: answer,
              // instruction: {
              //   connect: { id: answer.instructionId }
              // } 
            }))
          },
          feedback: {
            create: {
              grade,
              message
            }
          }
        },
        include: {
          answers: true
        }
      })
    }
}