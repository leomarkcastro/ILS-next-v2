import prisma from "@/lib/prisma";
import { Session, unstable_getServerSession } from "next-auth";
import Joi from "joi";
import { authOptions } from "../../auth/[...nextauth]";

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

  switch (task) {
    case "getAll": {
      // Get all classrooms
      const classrooms = await prisma.class.findMany({
        where: {
          facilitatorID: session.id,
        },
        include: {
          ClassProfile: true,
          Students: true,
        },
      });
      res.setHeader("Cache-Control", "s-maxage=180");
      return res.json(classrooms);
    }
    case "getOne": {
      // Get one classroom
      const classroom = await prisma.class.findUnique({
        where: {
          id: params[1],
        },
        include: {
          ClassProfile: true,
          Students: {
            include: {
              profile: {
                include: {
                  User: true,
                },
              },
            },
          },
          ExamSets: {
            where: {
              OR: [
                {
                  Takers: {
                    some: {
                      id: session.id,
                    },
                  },
                },
                {
                  Takers: {
                    none: {},
                  },
                },
              ],
            },
            include: {
              Exam: {
                where: {
                  profileId: session.id,
                },
              },
            },
          },
          Facilitator: {
            include: {
              User: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      classroom.Students = classroom.Students.map((student) => {
        return {
          ...student,
          profile: {
            ...student.profile,
            User: {
              ...student.profile.User,
              passwordHash: undefined,
            },
          },
        };
      });
      res.setHeader("Cache-Control", "s-maxage=180");
      return res.json(classroom);
    }
    case "classAddMember": {
      // Validate body
      // const schema = Joi.object({
      //   email: Joi.string().required(),
      // });

      // const { error, value } = schema.validate(body);

      // if (error) {
      //   return res.status(400).json({ error: error.details[0].message });
      // }

      await prisma.class.update({
        where: {
          id: params[1],
        },
        data: {
          Students: {
            create: {
              profile: {
                connect: {
                  id: params[2],
                },
              },
            },
          },
        },
      });

      return res.status(200).json({ message: "Success" });
    }
    case "classRemoveMember": {
      await prisma.studentsOnClasses.delete({
        where: {
          profileId_classId: {
            profileId: params[2],
            classId: params[1],
          },
        },
      });
    }
    case "createExamSet": {
      //   {
      //   name: parent.name.value,
      //   dateStart: parent.dateStart.value,
      //   dateEnd: parent.dateEnd.value,
      //   note: parent.note.value,
      //   takers: [
      //     {
      //       profileId: parent.takers[0].profileId,
      //       email: parent.takers[0].email,
      //     },
      //   ],
      // }
      // Validate body
      const schema = Joi.object({
        name: Joi.string().required(),
        note: Joi.string().allow(""),
        takers: Joi.array(),
      });

      const { error, value } = schema.validate(body);

      if (error) {
        return res
          .status(400)
          .json({ errorFrom: "validation", error: error.details[0].message });
      }

      await prisma.class.update({
        where: {
          id: params[1],
        },
        data: {
          ExamSets: {
            create: {
              name: value.name,
              notes: value.note,
              options: {},
              Takers: {
                connect: value.takers.map((taker) => {
                  return {
                    id: taker.id,
                  };
                }),
              },
            },
          },
        },
      });

      return res.status(200).json({ message: "Success" });
    }
    case "deleteExamSet": {
      await prisma.examSet.delete({
        where: {
          id: params[1],
        },
      });
      return res.status(200).json({ message: "Success" });
    }
    case "create": {
      if (method != "POST") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      // console.log(body);

      // Validate body
      const schema = Joi.object({
        name: Joi.string().required(),
        school: Joi.string().allow(""),
        note: Joi.string().allow(""),
        members: Joi.array().items(
          Joi.object({
            // email: Joi.string().email().required(),
            id: Joi.string().required(),
          }).unknown(true)
        ),
      });

      const { error, value } = schema.validate(body);

      if (error) {
        // console.log(error);
        return res
          .status(400)
          .json({ type: "validation", error: error.details[0].message });
      }

      // Create classroom
      const classroom = await prisma.class.create({
        data: {
          ClassProfile: {
            create: {
              name: value.name,
              notes: value.note,
              school: value.school,
            },
          },
          Facilitator: {
            connect: {
              id: session.id as string,
            },
          },
        },
      });

      // Add members
      await prisma.class.update({
        where: {
          id: classroom.id,
        },
        data: {
          Students: {
            create: value.members.map((member) => {
              return {
                profile: {
                  connect: {
                    id: member.id,
                  },
                },
              };
            }),
          },
        },
      });

      return res.json(classroom);
    }
    case "delete": {
      if (method != "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      // Delete classroom
      await prisma.class.delete({
        where: {
          id: params[1],
        },
      });

      return res.status(200).json({ message: "Success" });
    }
    case "leave": {
      if (method != "DELETE") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      // Leave classroom. Delete studentOnClass
      await prisma.studentsOnClasses.delete({
        where: {
          profileId_classId: {
            profileId: session.id as string,
            classId: params[1],
          },
        },
      });

      return res.status(200).json({ message: "Success" });
    }
    default: {
      // 404 Not Found
      return res.status(404).json({ error: "Not Found" });
    }
  }
}
