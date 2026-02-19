
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.id });
  res.json(post);
};

export const getPosts = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const query = search ? { $text: { $search: search } } : {};
  const posts = await Post.find(query)
    .populate("author", "name")
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name");
  post.views += 1;
  await post.save();
  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(post);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  await Comment.deleteMany({ post: req.params.id });
  res.json({ message: "Post deleted" });
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user.id)) {
    post.likes.push(req.user.id);
    await post.save();
  }
  res.json(post);
};

export const bookmarkPost = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.bookmarks.includes(req.params.id)) {
    user.bookmarks.push(req.params.id);
    await user.save();
  }
  res.json(user.bookmarks);
};

export const trendingPosts = async (req, res) => {
  const posts = await Post.find().sort({ views: -1, likes: -1 }).limit(5);
  res.json(posts);
};

export const tagAnalytics = async (req, res) => {
  const tags = await Post.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  res.json(tags);
};
