import isAdminHelper from "../helpers/isAdmin";

export default async function(ctx, next) {
  const allow = isAdminHelper(ctx.state.user.username);
  if (allow) return next();
  else ctx.response.status = 403;
}
