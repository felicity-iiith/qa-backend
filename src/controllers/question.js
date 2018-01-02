import Question from "../models/Question";

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
  ctx.body = await Question.findAll({
    attributes: { exclude: ["answer", "body"] }
  });
}
