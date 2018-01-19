import koaRouter from "koa-joi-router";

import isAdminMiddleware from "../middleware/isAdmin";
import * as ctrl from "../controllers/admin";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/admin");
router.use(isAdminMiddleware);

const routes = [
  {
    method: "get",
    path: "/recheck/:qno",
    handler: [ctrl.recheck],
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
        summary: "Recheck a question",
        description:
          "Rechecks all solutions for a question and updates users accordingly. Expensive request.",
        tags: ["admin"]
      }
    }
  }
];

router.route(routes);
export default router;
