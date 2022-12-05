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
    case "getOne": {
      // Get one classroom
      const classroom = await prisma.user.findUnique({
        where: {
          id: params[1],
        },
        include: {
          Profile: true,
        },
      });
      res.setHeader("Cache-Control", "s-maxage=180");
      delete classroom.passwordHash;
      return res.json(classroom);
    }
    case "getOneByEmail": {
      // Get one classroom
      const user = await prisma.user.findUnique({
        where: {
          email: params[1],
        },
        include: {
          Profile: true,
        },
      });
      res.setHeader("Cache-Control", "s-maxage=180");
      if (user) delete user.passwordHash;
      return res.json(user);
    }
    case "getClassrooms": {
      const classroom = await prisma.profile.findUnique({
        where: {
          id: session.id as string,
        },
        include: {
          ClassesJoined: {
            include: {
              class: {
                include: {
                  ClassProfile: true,
                  Students: true,
                  Facilitator: {
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
          ClassesOwned: {
            include: {
              ClassProfile: true,
              Students: true,
            },
          },
        },
      });
      res.setHeader("Cache-Control", "s-maxage=180");
      return res.json(classroom);
    }
    case "getProfile": {
      const profile = await prisma.profile.findUnique({
        where: {
          id: session.id as string,
        },
        include: {
          Exams: {
            include: {
              ExamContents: true,
              ExamSet: {
                include: {
                  Class: {
                    include: {
                      ClassProfile: true,
                    },
                  },
                },
              },
            },
          },
          ProfileDemoraphics: true,
          User: {
            select: {
              email: true,
            },
          },
        },
      });

      res.setHeader("Cache-Control", "s-maxage=180");
      return res.json(profile);
    }
    case "getProfileDemographics": {
      const profile = await prisma.profileDemoraphics.findUnique({
        where: {
          id: session.id as string,
        },
      });

      res.setHeader("Cache-Control", "s-maxage=180");
      return res.json(profile);
    }
    case "updateProfileDemographics": {
      const schema = Joi.object({
        fullname: Joi.string().required(),
        gender: Joi.string()
          .required()
          .valid("Male", "Female", "Prefer Not To Say"),
        age: Joi.number().positive().precision(0).required(),
        religion: Joi.string().required(),
        course: Joi.string().required(),
        year: Joi.number().required(),
        specialization: Joi.string().required(),
        section: Joi.string().required(),
        municipality: Joi.string().required(),
        province: Joi.string().required(),
        familyType: Joi.string().required(),
        surveyAnswers: Joi.object(),
        id: Joi.any().strip(),
        profileId: Joi.any().strip(),
      });

      const { error, value } = schema.validate(body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // console.log(value);

      // check if profileDemo exists
      const profileDemo = await prisma.profileDemoraphics.findUnique({
        where: {
          id: session.id as string,
        },
      });

      if (profileDemo) {
        // console.log(value);
        // update
        const updatedProfileDemo = await prisma.profileDemoraphics.update({
          where: {
            id: session.id as string,
          },
          data: value,
        });

        res.setHeader("Cache-Control", "s-maxage=180");
        return res.json(updatedProfileDemo);
      } else {
        const profile = await prisma.profile.update({
          where: {
            id: session.id as string,
          },
          data: {
            ProfileDemoraphics: {
              create: {
                ...value,
                id: session.id as string,
              },
            },
          },
        });
        res.setHeader("Cache-Control", "s-maxage=180");
        return res.json(profile);
      }
    }
    case "updateSurvey": {
      const schema = Joi.object({
        surveyAnswers: Joi.object().required(),
      }).unknown(false);

      const { error, value } = schema.validate(body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // check if profileDemo exists
      const profileDemo = await prisma.profileDemoraphics.findUnique({
        where: {
          id: session.id as string,
        },
      });

      if (profileDemo) {
        // console.log(value);
        // update
        const updatedProfileDemo = await prisma.profileDemoraphics.update({
          where: {
            id: session.id as string,
          },
          data: value,
        });

        res.setHeader("Cache-Control", "s-maxage=180");
        return res.json(updatedProfileDemo);
      } else {
        const profile = await prisma.profile.update({
          where: {
            id: session.id as string,
          },
          data: {
            ProfileDemoraphics: {
              create: {
                ...value,
                id: session.id as string,
              },
            },
          },
        });
        res.setHeader("Cache-Control", "s-maxage=180");
        return res.json(profile);
      }
    }
    default: {
      // 404 Not Found
      return res.status(404).json({ error: "Not Found" });
    }
  }
}
