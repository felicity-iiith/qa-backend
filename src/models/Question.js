import Sequelize from "sequelize";
import db from "./db";

const Question = db.define("question", {
  // Store qno separately as I was encountering some weird bug previously
  // due to shitty sequelize, dont know if its needed anymore
  // Prolly shall make it primary key
  qno: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

export default Question;
