import Sequelize from "sequelize";
import db from "./db";
import Question from "./Question";

const Level = db.define("level", {
  lno: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  minSolve: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3
  }
});

Question.belongsTo(Level);
Level.hasMany(Question);

export default Level;
