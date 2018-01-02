import koaRouter from "koa-joi-router";

import * as ctrl from "../controllers/scoreboard";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/scoreboard");

const routes = [
  {
    method: "get",
    path: "/",
    handler: [ctrl.get],
    meta: {
      swagger: {
        summary: "Scoreboard",
        description:
          "Displays scoreboard, is cached and updated every few minutes (Page 1)",
        tags: ["scoreboard"]
      }
    }
  },
  {
    method: "get",
    path: "/:page",
    handler: [ctrl.get],
    validate: {
      params: {
        page: Joi.number()
      }
    },
    meta: {
      swagger: {
        summary: "Scoreboard",
        description:
          "Displays scoreboard, is cached and updated every few minutes (Page `page`)",
        tags: ["scoreboard"]
      }
    }
  }
];

router.route(routes);
export default router;
