import compose from "koa-compose";

import main from "./main";
import user from "./user";
import question from "./question";
import scoreboard from "./scoreboard";
import generateApiDocs from "./swagger";

const routers = [main, user, question, scoreboard];

if (process.env.NODE_ENV != "production") {
  const docsRouter = generateApiDocs(routers);
  routers.push(docsRouter);
}

export default compose(routers.map(router => router.middleware()));
