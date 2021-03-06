import db from "./db";
import User from "./User";
import Question from "./Question";

export default async function setupModels() {
  // If production then dont alter tables, but fail if table exists
  await db.sync({ force: !isProd });

  // If production then dont create mock models
  if (isProd) return;
  await User.create({
    username: "user1"
  });
  await Question.bulkCreate([
    {
      qno: 1,
      title: "QTitle 1",
      body: "QBody 1",
      answer: JSON.stringify(["1", "2", "3"])
    },
    {
      qno: 2,
      title: "QTitle 2",
      body: "QBody 2",
      answer: JSON.stringify(["2"])
    },
    {
      qno: 3,
      title: "QTitle 3",
      body: "QBody 3",
      answer: JSON.stringify(["1", "4"])
    },
    {
      qno: 4,
      title: "QTitle 4",
      body: "QBody 4",
      answer: JSON.stringify(["3"])
    },
    {
      qno: 5,
      title: "QTitle 5",
      body: "QBody 5",
      answer: JSON.stringify(["4"])
    }
  ]);
}
