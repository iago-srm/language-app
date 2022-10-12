import {
    IStudentOutputRepository,
    ActivityDTO,
    StudentOutputDTO
  } from '@application/ports';
  import { PrismaClient } from '@prisma-client';
  
  export class StudentOutputRepository implements IStudentOutputRepository {
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

    getStudentOutputById (id: number) {
      return this.prisma.studentOutput.findUnique({
        where: {
          id
        },
        include: {
          outputs: {
            include: {
              optionsSelections: true,
              feedback: true
            }
          },
          activity: {
            include: {
              instructions: {
                include: {
                  options: true,
                  optionsAnswers: true
                  // studentOutputs: true
                }
              }
            }
          }
        }
      })
    }
  
    getStudentOutputsByStudentIds (ids: string[]) {
      return this.prisma.studentOutput.findMany({
        where: {
          studentId: { in: ids }
        }, 
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true
                }
              }
            }
          },
          activity: {
            select: {
              cefr: true,
              title: true,
              // timeToComplete: true,
              topics: true,
              contentType: true,
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
          }
        }
      })
    }
  
    insertStudentOutput ({
      outputs,
      activityId,
      studentId
    }) {
      return this.prisma.studentOutput.create({
        data: {
          feedbackGiven: false,
          activity: {
            connect: {
              id: activityId
            }
          },
          student: {
            connect: {
              id: studentId
            }
          },
          outputs: {
            create: outputs.map(output => ({
              textOutput: output.textOutput || null,
              optionsSelections: output.optionsSelectionsIds ? {
                connect: output.optionsSelectionsIds.map(id => ({ id }))
              } : undefined,
              instruction: {
                connect: {
                  id: output.instructionId
                }
              }
            }))
          } 
        }
      })
    }
  
    insertStudentOutputFeedbacks(
      feedbacks
    ) {
      const promises = [];
      for(let feedback of feedbacks) {
        promises.push(this.prisma.instructionStudentOutput.update({
          where: {
            id: feedback.instructionOutputId
          },
          data: {
            feedback: {
              create:{
                message: feedback.feedback
              }
            }
          }
        }))
      }
      return Promise.all(promises);
    }

    updateStudentOutputById(outputId: number, args: Partial<StudentOutputDTO>) {
      return this.prisma.studentOutput.update({
        where: {
          id: outputId
        },
        data: {
          feedbackGiven: args.feedbackGiven
        }
      })
    }
  }
  