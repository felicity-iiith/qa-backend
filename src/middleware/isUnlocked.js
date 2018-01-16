import Question from "../models/Question";
import Level from "../models/Level";

export async function isUnlocked(ctx, next) {
  const { user } = ctx.state;
  const { qno } = ctx.params;
  const question = await Question.findOne({
    where: { qno },
    include: [Level]
  });
  if (question && question.level.lno <= user.maxLevel) {
    return next();
  } else ctx.response.status = 403;
}
