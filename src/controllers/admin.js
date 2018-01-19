import Question from "../models/Question";
import Submission from "../models/Submission";
import User from "../models/User";

import updateUser from "../helpers/updateUser";

export async function recheck(ctx) {
  ctx.body = "";
  const question = await Question.findOne({
    where: { qno: ctx.params.qno }
  });

  const submissions = await Submission.findAll({
    where: { questionId: question.id },
    include: [User]
  });

  const answer = JSON.parse(question.answer);
  for (let submission of submissions) {
    const new_status = answer.indexOf(submission.submission) != -1;
    if (new_status != submission.status) {
      ctx.body += `Updating ${submission.user.username}\n`;
      await submission.update({ status: new_status });
      await updateUser(submission.user);
    }
  }
  ctx.body += "DONE!\n";
}
