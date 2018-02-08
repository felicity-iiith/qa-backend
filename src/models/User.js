import Sequelize from "sequelize";
import db from "./db";

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
    defaultValue: 25000 // HACK: since there will never be more questions than this
  }
});

export default User;
