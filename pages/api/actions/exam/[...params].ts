import prisma from "@/lib/prisma";
import { Session, unstable_getServerSession } from "next-auth";
import Joi from "joi";
import { authOptions } from "../../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

export default async function handle(req, res) {
  // Get query, params and task
  const query = req.query || {};
  const { params } = query;
  const task = params ? params[0] : "";
  // Get Method [GET, POST, PUT, DELETE]
  const method = req.method;
  // Get session
  const session = await unstable_getServerSession(req, res, authOptions);
  // GET body
  const body = req.body || {};

  // console.log(body);

  switch (task) {
    case "submit": {
      // validate if user already submitted an exam for this exam set
      if (params[1] != "undefined") {
        const exam = await prisma.exam.count({
          where: {
            examSetId: params[1],
            profileId: session.id,
          },
        });
        if (exam) {
          return res.status(400).json({
            error: "You have already submitted an exam for this exam set.",
          });
        }
      }

      // Validate body
      const schema = Joi.object({
        examResult: Joi.object({
          seqGlo: Joi.number().required(),
          actRef: Joi.number().required(),
          senInt: Joi.number().required(),
          visVer: Joi.number().required(),
          acronym: Joi.string().required(), //.valid,
          picks: Joi.object(), // improve later
        }),
        examSetID: Joi.string(),
      });

      const { error, value } = schema.validate({
        examResult: body,
        examSetID: params[1],
      });
      // console.log(value);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // validate if date of submission is within the exam set's duration
      const examSet = await prisma.examSet.findUnique({
        where: {
          id: params[1],
        },
      });

      // console.log(value);

      const dataValidator = Prisma.validator<Prisma.ExamCreateInput>();
      const data = dataValidator({
        Profile: {
          connect: {
            id: session.id as string,
          },
        },
        ExamContents: {
          create: {
            seqGlo: value.examResult.seqGlo,
            actRef: value.examResult.actRef,
            senInt: value.examResult.senInt,
            visVer: value.examResult.visVer,
            type: value.examResult.acronym,
            answers: value.examResult.picks,
          },
        },
        ...(value.examSetID != "undefined"
          ? {
              ExamSet: {
                connect: {
                  id: value.examSetID,
                },
              },
            }
          : {}),
      });
      // console.log(data);
      // Submit exam
      const exam = await prisma.exam.create({
        data,
      });

      return res.status(200).json({ success: true, exam });
    }
    case "getExamSet": {
      // Get exam set
      const examSetDataComplete = await prisma.examSet.findUnique({
        where: {
          id: params[1],
        },
        include: {
          Exam: {
            include: {
              ExamContents: true,
              Profile: {
                include: {
                  ProfileDemoraphics: true,
                  User: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          Takers: {
            include: {
              User: {
                select: {
                  email: true,
                },
              },
            },
          },
          Class: {
            select: {
              ClassProfile: true,
              Facilitator: {
                select: {
                  User: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
              Students: {
                select: {
                  profile: {
                    select: {
                      User: {
                        select: {
                          email: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ success: true, examSetDataComplete });
    }
    case "getAllExamSet": {
      // Get exam set
      /*
      const examSetDataComplete = await prisma.examSet.findMany({
        where: {
          // Class: {
          //   Facilitator: {
          //     User: {
          //       email: session.user.email,
          //     },
          //   },
          // },
        },
        include: {
          Exam: {
            include: {
              ExamContents: true,
              Profile: {
                include: {
                  ProfileDemoraphics: true,
                  User: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
          Takers: {
            include: {
              User: {
                select: {
                  email: true,
                },
              },
            },
          },
          Class: {
            select: {
              ClassProfile: true,
              Facilitator: {
                select: {
                  User: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
              Students: {
                select: {
                  profile: {
                    select: {
                      User: {
                        select: {
                          email: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      */

      const examAll = await prisma.exam.findMany({
        include: {
          ExamContents: true,
          Profile: {
            include: {
              ProfileDemoraphics: true,
              User: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ success: true, examAll });
    }
    case "getAllExamsByYou": {
      // Get all exams by you
      const exams = await prisma.exam.findMany({
        where: {
          ExamSet: {
            Class: {
              facilitatorID: session.id,
            },
          },
        },
        include: {
          ExamContents: true,
          Profile: {
            select: {
              User: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ success: true, exams });
    }
    case "delete": {
      // Delete exam
      const exam = await prisma.exam.delete({
        where: {
          id: params[1],
        },
      });

      return res.status(200).json({ success: true, exam });
    }
    case "checkIfExamSetExist": {
      // Check if exam set exist
      const examSet = await prisma.examSet.findUnique({
        where: {
          id: params[1],
        },
      });

      return res.status(200).json({ success: true, examSet });
    }
    default: {
      // 404 Not Found
      return res.status(404).json({ error: "Not Found" });
    }
  }
}
