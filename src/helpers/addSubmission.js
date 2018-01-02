// function which adds a submission
// returns the status of the submission

import Submission from "../models/Submission";

export default async function addSubmission(user, question, answer) {
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
