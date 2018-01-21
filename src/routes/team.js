import koaRouter from "koa-joi-router";
import basicAuth from "koa-basic-auth";

import * as ctrl from "../controllers/team";

const Joi = koaRouter.Joi;
const router = koaRouter();
router.prefix("/teams");
router.use(
  basicAuth({ name: "admin", pass: config.get("teamWebhookPassword") })
);

const routes = [
  {
    method: "get",
    path: "/:teamname/:username",
    handler: [ctrl.addMember],
    validate: {
      params: {
        teamname: Joi.string().token(),
        username: Joi.string()
      }
    },
    meta: {
      swagger: {
        summary: "Add Member To Team (creating it if needed)",
        tags: ["teams"]
      }
    }
  }
];

router.route(routes);
export default router;
