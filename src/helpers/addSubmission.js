// function which adds a submission
// returns the status of the submission

import Submission from "../models/Submission";

export default async function addSubmission(user, question, answer) {
  const submissions = await Submission.count({
    where: {
      questionId: question.id,
      userUsername: user.username
    }
  });
  if (submissions > config.get("maxSubmissions")) return false;
  answer = answer.toLowerCase();
  const status = JSON.parse(question.answer).indexOf(answer) != -1;
  await Submission.findOrCreate({
    where: {
      submission: answer,
      questionId: question.id,
      userUsername: user.username,
      status
    }
  });
  return status;
}
