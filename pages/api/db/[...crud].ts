import prisma from "@/lib/prisma";
import { Session, unstable_getServerSession } from "next-auth";
import Joi from "joi";
import { authOptions } from "../auth/[...nextauth]";

function IDConverter(object: string, id: string) {
  switch (object) {
    case "contract":
      return id;
    default:
      return Number(id);
  }
}

const accessRules = {
  user: {
    GET: (session: Session) => !!session,
    POST: (session: Session) => true,
    PUT: (session: Session) => !!session,
    DELETE: (session: Session) => !!session,
  },
};

const validator = {
  user: {
    POST: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
    PUT: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  },
};

const preDBQueryProcessor = {
  user: {
    POST: (body: any) => {
      return {
        email: body.email,
        password: body.password,
      };
    },
  },
};

const postDBQueryProcessor = {};

export default async function handle(req, res) {
  const crudCommands = req.query.crud;
  const query = req.query.q || "{}";
  const method = req.method;
  const session = await unstable_getServerSession(req, res, authOptions);

  res.setHeader("Cache-Control", "s-maxage=180");

  const object = crudCommands[0];
  const id = crudCommands[1];

  if (Object.keys(prisma).indexOf(object) === -1 || !accessRules[object]) {
    return res.status(404).send({ error: "Not found" });
  }

  if (!accessRules[object][method](session)) {
    return res.send({
      error: "You must be sign to proceed.",
    });
  }

  if (validator[object] && validator[object][method]) {
    // console.log(req.body);
    const { error, value } = validator[object][method].validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
    // console.log(value);
  }

  try {
    switch (method) {
      case "GET": {
        if (id) {
          const result = await prisma[object].findFirst({
            where: {
              id: IDConverter(object, id),
            },
            ...JSON.parse(query),
          });
          res.json(result);
        } else {
          const _q = {
            ...JSON.parse(query),
          };
          const result = await prisma[object].findMany({
            ..._q,
          });
          res.json(result);
        }
        break;
      }
      case "POST": {
        let data = req.body;
        if (
          preDBQueryProcessor[object] &&
          preDBQueryProcessor[object][method]
        ) {
          data = preDBQueryProcessor[object][method](req.body);
        }
        const result = await prisma[object].create({
          data,
        });
        res.json(result);
        break;
      }
      case "PUT": {
        const item = await prisma[object].findFirst({
          where: {
            id: IDConverter(object, id),
            Owner: {
              email: session.user.email,
            },
          },
        });
        const result = await prisma[object].update({
          where: {
            id: item.id,
          },
          data: {
            ...req.body,
            Owner: {
              connectOrCreate: {
                create: {
                  email: session.user.email,
                  name: session.user.name,
                },
                where: {
                  email: session.user.email,
                },
              },
            },
          },
        });
        res.json(result);
        break;
      }
      case "DELETE": {
        const item = await prisma[object].findFirst({
          where: {
            id: IDConverter(object, id),
            Owner: {
              email: session.user.email,
            },
          },
        });
        const result = await prisma[object].delete({
          where: {
            id: item.id,
          },
        });
        res.json(result);
        break;
      }
      default: {
        res.status(500).json({
          error: "Method not supported",
        });
        break;
      }
    }
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
}
