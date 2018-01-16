// function which updates a user's score and maxLevel
// We should do this instead of directly updating score as otherwise
// we might have an issue after rechecking

import Question from "../models/Question";
import Level from "../models/Level";

export default async function updateUser(user) {
  const submissions = await user.getSubmissions({
    where: { status: true },
    include: [
      {
        model: Question,
        include: [Level]
      }
    ]
  });

  let score = 0,
    maxLevel = 0,
    solved = {},
    levelSolvedCount = {};

  for (const submission of submissions) {
    const qno = submission.question.qno;
    if (solved[qno]) continue;
    solved[qno] = true;
    score += submission.question.score;
    const level = submission.question.level.lno;
    maxLevel = Math.max(level, maxLevel);
    if (!levelSolvedCount[level]) levelSolvedCount[level] = 0;
    levelSolvedCount[level] += 1;
  }

  if (
    maxLevel == 0 ||
    levelSolvedCount[maxLevel] >=
      (await Level.findOne({ where: { lno: maxLevel } })).minSolve
  )
    maxLevel += 1;

  return await user.update({
    score,
    maxLevel
  });
}
