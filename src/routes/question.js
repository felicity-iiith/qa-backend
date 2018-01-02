import koaRouter from "koa-joi-router";

import * as ctrl from "../controllers/question";

import { isUnlocked } from "../middleware/isUnlocked";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/questions");

const routes = [
  {
    method: "get",
    path: "/:qno",
    handler: [isUnlocked, ctrl.get],
    validate: {
      params: {
        qno: Joi.number()
          .integer()
          .positive()
          .description("Question number")
      }
    },
    meta: {
      swagger: {
        summary: "Get question",
        tags: ["question"]
      }
    }
  },
  {
    method: "post",
    path: "/:qno/answer",
    handler: [isUnlocked, ctrl.checkAnswer],
    validate: {
      params: {
        qno: Joi.number()
          .integer()
          .positive()
          .description("Question number")
      },
      type: "form",
      body: {
        answer: Joi.string()
      },
      output: {
        200: {
          body: {
            status: Joi.boolean(),
            user: Joi.object()
          }
        }
      }
    },
    meta: {
      swagger: {
        summary: "Submit answer",
        tags: ["question"]
      }
    }
  },
  {
    method: "get",
    path: "/",
    handler: [ctrl.getAll],
    meta: {
      swagger: {
        summary: "Get all questions",
        description: "Get a list of questions for frontend",
        tags: ["question"]
      }
    }
  }
];

router.route(routes);
export default router;
