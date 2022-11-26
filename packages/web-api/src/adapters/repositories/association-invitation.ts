import {
  IAssociationInvitationRepository,
  AssociationInvitationTokenDTO,
} from "@application/ports";
import { PrismaClient } from "@prisma-client";
export class AssociationInvitationRepository
  implements IAssociationInvitationRepository
{
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // getTokenByTokenValue(token: string) {
  //   return this.prisma.studentInstructorAssociationInvitation.findUnique({
  //     where: {
  //       token,
  //     },
  //   });
  // }

  getTokenByTokenValue(token: string) {
    return this.prisma.studentInstructorAssociationInvitation.findUnique({
      where: {
        token,
      },
      include: {
        instructor: {
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }

  insertToken({
    token,
    studentId,
    instructorId,
    accepted,
  }: AssociationInvitationTokenDTO) {
    return this.prisma.studentInstructorAssociationInvitation.create({
      data: {
        token,
        student: {
          connect: { id: studentId },
        },
        instructor: {
          connect: { id: instructorId },
        },
        accepted,
      },
    });
  }

  updateToken(
    id: string,
    { accepted }: Partial<AssociationInvitationTokenDTO>
  ) {
    return this.prisma.studentInstructorAssociationInvitation.update({
      where: { id },
      data: {
        accepted,
      },
    });
  }

  getTokenByStudentAndInstructorIds(instructorId: string, studentId: string) {
    return this.prisma.studentInstructorAssociationInvitation.findFirst({
      where: {
        instructorId,
        studentId,
      },
    });
  }

  getTokenByStudentId(studentId: string) {
    return this.prisma.studentInstructorAssociationInvitation.findFirst({
      where: {
        studentId,
      },
    });
  }

  removeAssociationByStudentId(studentId: string) {
    return this.prisma.studentInstructorAssociationInvitation.deleteMany({
      where: {
        studentId,
      },
    });
  }
}
