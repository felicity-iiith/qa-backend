import Sequelize from "sequelize";
import db from "./db";
import User from "./User";

const TeamMembers = db.define("teammembers", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  }
});

TeamMembers.belongsTo(User);
User.hasMany(TeamMembers);

export default TeamMembers;
