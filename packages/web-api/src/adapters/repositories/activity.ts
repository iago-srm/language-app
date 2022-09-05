import {
  ActivityDTO,
  ActivityInstructionDTO,
  CEFR,
  IActivityRepository
} from '@application/ports';
import { PrismaClient } from '@prisma-client';

export class ActivityRepository implements IActivityRepository {
  prisma: PrismaClient;
  private _pageSize = 10;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getActivitiesByStudentId(
    cursor: number,
    studentId: string,
    title?: string,
    cefr?: CEFR
  ) {
    return this.prisma.activity.findMany({
      take: this._pageSize,
      skip: 1,
      cursor: {
        id: cursor
      },
      where: {
        AND: [
          { title: { contains: title }},
          { cefr },
        ]
      },
      include: {
        outputs: {
          where: {
            studentId
          }
        }
      }
    })
  }

  getActivitiesByInstructorIdOrAll(
    cursor: number,
    instructorId?: string,
    title?: string,
    cefr?: CEFR
  ) {
    return this.prisma.activity.findMany({
      take: this._pageSize,
      skip: 1,
      cursor: {
        id: cursor
      },
      where: {
        AND: [
          { title: { contains: title }},
          { cefr },
          { instructorId }
        ]
      },
      orderBy: {
        id: 'asc',
      },
      select: {
        title: true,
        contentType: true,
        topics: true,
        cefr: true
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
          create: instructions
        }
      },
      include: {
        instructions: true
      }
      // select: { id: true }
    })
  }

  insertNewInstructions(activityId: number, instructions: ActivityInstructionDTO[]) {
    return this.prisma.activity.update({
      where: { id: activityId },
      data: {
        instructions: {
          createMany: {
            data: instructions
          }
        }
      }
    })
  }


}
