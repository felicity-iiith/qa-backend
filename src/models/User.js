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
  maxLevel: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

export default User;
