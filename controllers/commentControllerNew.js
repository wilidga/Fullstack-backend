//const res = require("express/lib/response");
const Post = require("../models/posts");
const Comment = require("../models/comment");
const createError = require("http-errors");

const getComment = async (req, res) => {
  const comments = await Comment.find().populate("author");
  res.json({ msg: "al comments", comments });
};

const createComment = async (req, res) => {
  const newCommentPrev = req.body;

  if (newCommentPrev.comment === "") {
    return res.json({ msg: "something went wrong" });
  }

  try {
    if (req.file?.filename) {
      newCommentPrev.image = req.file.filename;
    }

    const postToUpdated = await Post.findById(req.params.id);
    const newComment = new Comment(newCommentPrev);
    console.log(newComment);
    await newComment.save();
    postToUpdated.comments.push(newComment);
    const postUpdated = await postToUpdated.save();
    res.json({ msg: "comment created", comment: postUpdated });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
};

const updateComment = async (commentId, reqId, newComment) => {
  const existComment = await Comment.findById(commentId);
  console.log(reqId, existComment.author._id.toString());
  if (reqId !== existComment.author._id.toString()) {
    throw createError(400, "unauthorized");
  }

  const commentToUpdate = await Comment.findByIdAndUpdate(
    commentId,
    newComment,
    { returnDocument: "after" }
  );
  return commentToUpdate;
};

const deleteComment = async (commentId, reqId) => {
  const existComment = await Comment.findById(commentId);

  if (reqId !== existComment.author._id.toString()) {
    throw createError(400, "unauthorized");
  }

  const commentDeleted = await Comment.findByIdAndDelete(commentId);
  return commentDeleted;
};
const detailedComment = async (commentId) => {
  const commentDetail = await Comment.findById(commentId).populate("author");
  return commentDetail;
};
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getComment,
  detailedComment,
};
