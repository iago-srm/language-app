import {
  IActivityRepository,
  ActivityDTO,
  StudentOutputDTO
} from '@application/ports';
import { PrismaClient } from '@prisma-client';

export class ActivityRepository implements IActivityRepository {
  prisma: PrismaClient;
  private _pageSize = 20;

  constructor() {
    this.prisma = new PrismaClient();
  }

  _paginate(id) {
    return id ? {
      skip: 1,
      cursor: {
        id
      }
    } : undefined
  }

  getActivities({
    instructorId,
    cursor,
    title,
    topics,
    cefr,
    contentTypes,
    ids
  }) {
    // console.log(ids)
    return this.prisma.activity.findMany({
      take: this._pageSize,
      ...this._paginate(cursor),
      where: {
        AND: [
          { title: { contains: title }},
          { cefr },
          { instructorId },
          { topics: { hasSome: topics }},
          { contentType: { in: contentTypes }},
          ids ? { id: { in: ids }} : undefined
        ]
      },
      select: {
        id: true,
        title: true,
        description: true,
        contentType: true,
        topics: true,
        cefr: true,
        instructor: {
          include: {
            user: {
              select: {
                name: true, 
                image: true
              }
            }
          }
        }
      }
    })
  }

  async getActivityIdsByStudentList(studentId: string) {
    return (await this.prisma.studentActivityList.findMany({
      where: {
        studentId,
      },
      select: {
        activityId: true
      }
    })).map(({ activityId }) => activityId);
  }

  async insertActivityIntoStudentList(studentId: string, activityId: number) {
    await this.prisma.studentActivityList.create({
      data: {
        student: {
          connect: {
            id: studentId
          }
        },
        activity: {
          connect: {
            id: activityId
          }
        }
      }
    })
  }

  getActivityById(id: number) {
    return this.prisma.activity.findUnique({
      where: {
        id
      },
      include: {
        instructions: true
      }
    })
  }

  insertActivity(instructorId: string, activity: ActivityDTO) {
    const {
      title,
      contentType,
      content,
      topics,
      startTime,
      endTime,
      cefr,
      timeToComplete,
      instructions,
      description
    } = activity;
    console.log(instructions[0]);
    return this.prisma.activity.create({
      data: {
        title,
        contentType,
        content,
        topics,
        // startTime,
        // endTime,
        cefr,
        timeToComplete,
        description,
        instructor: {
          connect: {id: instructorId}
        },
        instructions: {
          create: [
            ...instructions.map(instruction => ({
              text: instruction.text,
              textAnswer: instruction.textAnswer,
              type:instruction.type,
              options: {
                create: instruction.options
              },
              optionsAnswers: {
                connect: instruction.optionsAnswers
              }
            }))
          ]
        }
      },
      include: {
        instructions: {
          include: {
            options: true,
            optionsAnswers: true
          }
        }
      }
    })
  }

  getStudentOutputById (id: number) {
    return this.prisma.studentOutput.findUnique({
      where: {
        id
      },
      include: {
        outputs: true,
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
    outputs,
  }: StudentOutputDTO) {
    return this.prisma.studentOutput.create({
      data: {
        feedbackGiven: false,
        outputs: {
          create: {

          }
        }
      }
    })
  }
  
  // async insertNewInstructions(activityId: number, instructions: ActivityInstructionDTO[]) {
  //   return (await this.prisma.activity.update({
  //     where: { id: activityId },
  //     data: {
  //       instructions: {
  //         createMany: {
  //           data: instructions
  //         }
  //       }
  //     },
  //     select: {
  //       instructions: {
  //         select: {
  //           answer: true,
  //           options: true,
  //           text: true,
  //           id: true
  //         }
  //       }
  //     }
  //   })).instructions
  // }

}
