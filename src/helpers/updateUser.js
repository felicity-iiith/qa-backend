// function which updates a user's score and maxUnlocked
// We should do this instead of directly updating score as otherwise
// we might have an issue after rechecking

import Question from "../models/Question";

export default async function updateUser(user) {
  const submissions = await user.getSubmissions({
    where: { status: true },
    include: [Question]
  });
  let score = 0,
    maxSolved = 0,
    solved = {};
  for (const submission of submissions) {
    const qno = submission.question.qno;
    if (solved[qno]) continue;
    solved[qno] = true;
    score += submission.question.score;
    maxSolved = Math.max(qno, maxSolved);
  }
  return await user.update({
    score,
    maxUnlock: maxSolved + 1
  });
}
