import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  IActivityRepository
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
    contentType,
    ids
  }) {
    console.log(ids)
    return this.prisma.activity.findMany({
      take: this._pageSize,
      ...this._paginate(cursor),
      where: {
        AND: [
          { title: { contains: title }},
          { cefr },
          { instructorId },
          { topics: { hasSome: topics }},
          { contentType },
          ids ? { id: { in: ids }} : undefined
        ]
      },
      select: {
        id: true,
        title: true,
        description: true,
        timeToComplete: true,
        contentType: true,
        topics: true,
        cefr: true
      }
    })
  }

  async getActivitiesByStudentProgress(studentId: string, completed: boolean) {
    return (await this.prisma.activitiesInProgress.findMany({
      where: {
        studentId,
        completed
      },
      select: {
        activityId: true
      }
    })).map(({ activityId }) => activityId);
  }

  async insertActivityProgress(studentId: string, activityId: number, completed: boolean) {
    await this.prisma.activitiesInProgress.create({
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
        },
        completed
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
    return this.prisma.activity.create({
      data: {
        title,
        contentType,
        content,
        topics,
        startTime,
        endTime,
        cefr,
        timeToComplete,
        description,
        instructor: {
          connect: {id: instructorId}
        },
        instructions: {
          create: [
            ...instructions.map(instruction => ({
              ...instruction,
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
