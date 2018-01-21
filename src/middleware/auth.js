import User from "../models/User";
import TeamMembers from "../models/TeamMembers";

const mock_userinfo = {
  id: "b055c3dd-1341-43c7-9668-18bb435c1e31", // random uuid
  email: "user1@gmail.com",
  given_name: "John",
  family_name: "Doe",
  gender: "male",
  username: "user1",
  name: "John Doe",
  preferred_username: "user1"
};

// Global middleware function to get username from header set by api gateway
export default async function(ctx, next) {
  if (ctx.request.url.startsWith("/teams")) return next();
  let userinfo =
    ctx.header["x-userinfo"] && JSON.parse(ctx.header["x-userinfo"]);
  if (!isProd && !userinfo) {
    userinfo = {
      ...mock_userinfo,
      username: ctx.header["username"] || mock_userinfo.username,
      preferred_username: ctx.header["username"] || mock_userinfo.username
    };
  }
  if (userinfo) {
    const team = await TeamMembers.findOne({
      where: { username: userinfo.username },
      include: [User]
    });
    if (!team) {
      ctx.status = 401;
      return;
    }
    ctx.state.user = team.user;
  }
  ctx.state.userinfo = userinfo;
  ctx.state.isAuthenticated = !!ctx.state.user; // Always true
  return next();
}
