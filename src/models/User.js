import Sequelize from "sequelize";
import db from "./db";

// XXX: Actually stores team, such haxxx
const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  maxUnlock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

export default User;
