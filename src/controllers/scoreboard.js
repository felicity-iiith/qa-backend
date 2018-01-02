import User from "../models/User";

// Has hacky caching and pagination
const TIME_TO_CACHE = isProd ? 30 : 5; // Update scoreboard every 30 seconds
const PAGE_LIMIT = 50;
let scores = undefined;

export async function get(ctx) {
  const page = ctx.params.page || 1;
  if (!scores) {
    let scorestmp;
    scorestmp = await User.findAll({
      attributes: ["username", "score", "updatedAt"],
      order: [["score", "DESC"], ["updatedAt"]]
    });
    scorestmp = scorestmp.map(score => score.toJSON());
    // Do all processing then replace scores
    scores = scorestmp;
    setTimeout(() => (scores = undefined), TIME_TO_CACHE * 1000);
  }
  ctx.body = {
    pageCount: Math.ceil(scores.length / PAGE_LIMIT),
    scores: scores.slice((page - 1) * PAGE_LIMIT, page * PAGE_LIMIT),
    pageLimit: PAGE_LIMIT
  };
}
