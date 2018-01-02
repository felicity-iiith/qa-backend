import Sequelize from "sequelize";
import db from "./db";
import User from "./User";
import Question from "./Question";

const Submission = db.define("submission", {
  submission: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

Submission.belongsTo(Question);
Submission.belongsTo(User);
User.hasMany(Submission);

export default Submission;
