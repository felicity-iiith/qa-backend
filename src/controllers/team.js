import User from "../models/User";
import TeamMembers from "../models/TeamMembers";

export async function addMember(ctx) {
  const { teamname, username } = ctx.params;
  let team = await User.findOrCreate({ where: { username: teamname } });
  team = team[0];
  let member = await TeamMembers.findOrCreate({
    where: {
      username,
      userUsername: team.username
    }
  });
  ctx.body = member[0];
}
