import Question from "../models/Question";
import Submission from "../models/Submission";
import Level from "../models/Level";

import addSubmission from "../helpers/addSubmission";
import updateUser from "../helpers/updateUser";

export async function get(ctx) {
  const { qno } = ctx.params;
  ctx.body = await Question.findOne({
    where: { qno },
    attributes: { exclude: ["answer"] }
  });
}

export async function checkAnswer(ctx) {
  const { qno } = ctx.params;
  const question = await Question.findOne({
    where: { qno }
  });
  const { user } = ctx.state;
  const status = await addSubmission(user, question, ctx.request.body.answer);
  const userUp = await updateUser(user);
  ctx.body = { status, user: userUp };
}

export async function getAll(ctx) {
  const { user } = ctx.state;

  ctx.body = await Question.findAll({
    attributes: { exclude: ["answer", "body"] },
    order: [["qno"]],
    include: [Level]
  });
  ctx.body = ctx.body.map(question => question.toJSON());
  ctx.body.forEach(question => (question.solved = false));

  // Prolly shall use a virtual method for question.solved
  const submissions = await Submission.findAll({
    where: { status: true, userUsername: user.get("username") },
    include: [Question]
  });
  submissions.forEach(
    submission => (ctx.body[submission.question.qno - 1].solved = true)
  );
}
