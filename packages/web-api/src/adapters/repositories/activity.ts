import {
  IActivityRepository,
  ActivityDTO,
  StudentOutputDTO
} from '@application/ports';
import { PrismaClient } from '@prisma-client';

export class ActivityRepository implements IActivityRepository {
  prisma: PrismaClient;
  private _pageSize = 1;

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
    pageSize,
    title,
    topics,
    cefr,
    contentTypes,
    ids
  }) {
    // console.log(ids)
    return this.prisma.activity.findMany({
      take: pageSize || this._pageSize,
      ...this._paginate(cursor),
      orderBy: {
        createdAt: 'desc'
      },
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

  async getStudentListActivityIdsByStudentId(studentId: string) {
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
        instructions: {
          include: {
            options: {
              select: {
                id: true,
                text: true
              }
            },
            optionsAnswers: {
              select: {
                id: true,
                text: true
              },
            }
          }
        }
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
      // timeToComplete,
      instructions,
      description
    } = activity;
    return this.prisma.activity.create({
      data: {
        title,
        contentType,
        content,
        topics,
        startTime,
        endTime,
        cefr,
        // timeToComplete,
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
              isMultiCorrect: instruction.isMultiCorrect,
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
