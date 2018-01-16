// Middleware which tells if the contest is "open" or not
// The contest is always open on the scoreboard and users route
// And always open for the admins

export default async function(ctx, next) {
  const allow =
    config.get("admins").indexOf(ctx.state.user.username) != -1 ||
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
