// Middleware which tells if the contest is "open" or not
// The contest is always open on the scoreboard and users route
// And always open for the admins

import isAdminHelper from "../helpers/isAdmin";

export default async function(ctx, next) {
  if (ctx.request.url.startsWith("/teams")) return next();
  const allow =
    isAdminHelper(ctx.state.user.username) ||
    ctx.request.path.startsWith("/scoreboard") ||
    ctx.request.path.startsWith("/users") ||
    (Date.now() > config.get("startTime") &&
      Date.now() < config.get("endTime"));
  if (allow) return next();
  else {
    ctx.response.status = 403;
    ctx.body = {
      startTime: config.get("startTime"),
      endTime: config.get("endTime")
    };
  }
}
