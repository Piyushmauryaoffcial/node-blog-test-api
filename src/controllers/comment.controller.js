
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const comment = await Comment.create({
    post: req.params.postId,
    user: req.user.id,
    text: req.body.text
  });
  res.json(comment);
};

export const getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "name");
  res.json(comments);
};
