import compose from "koa-compose";

import main from "./main";
import user from "./user";
import question from "./question";
import generateApiDocs from "./swagger";

const routers = [main, user, question];

if (process.env.NODE_ENV != "production") {
  const docsRouter = generateApiDocs(routers);
  routers.push(docsRouter);
}

export default compose(routers.map(router => router.middleware()));
