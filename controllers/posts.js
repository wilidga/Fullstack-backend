const Posts = require("../models/posts");
const createError = require("http-errors");

const createPost = async (req, res) => {
  const { title, postBody, author } = req.body;
  let images;
  try {
    if (req.file?.filename) {
      images = req.file.filename;
    }
    const newPost = await new Posts({
      title,
      postBody,
      author,
      images,
    });
    await newPost.save();

    res.status(200).json({ newPost });
  } catch (error) {}
};

const detailedPost = async (req, res) => {
  const { id } = req.params;
  const detailedPost = await Posts.findById(id);
  //const detailedPost = await Posts.findById(id).populate("author", "fullName");
  //  .populate("comments".populate("author"));
  res
    .status(200)
    .json({ msg: " detail todo ok desde el controllers", posts: detailedPost });
};

const updatePost = async (req, res) => {
  console.log("updatibng");
  const { id } = req.params;
  const { title, postBody, images } = req.body;
  console.log({ title, postBody, images });
  try {
    const existPost = await Posts.findById(id);

    if (
      req._id !== existPost.author.toString() &&
      req.role !== "administrator"
    ) {
      throw createError(400, "unauthorized");
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { title, postBody, images },
      { new: true }
    );
    res.status(200).json({ msg: "post updated correctly", posts: updatedPost });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(`deleting`);
  try {
    const existPost = await Posts.findById(id);
    if (
      req._id !== existPost.author.toString() &&
      req.role !== "administrator"
    ) {
      throw createError(400, "unauthorized");
    }
    const deletedPost = await Posts.findByIdAndDelete(id);
    res
      .status(200)
      .json({ msg: "delete todo ok desde el controllers", posts: deletedPost });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate("author", "fullName")
      .populate("comments.author", "fullName");
    res.status(200).json({ msg: "get todo ok desde el controllers", posts });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const updatePostComment = async (req, res) => {
  const { id } = req.params;
  const { author, comment } = req.body;
  console.log(`el id es post :`, id);
  console.log(req.params);
  // try {
  //   const updatedCommentedPost = await Posts.updateOne(
  //     { id },
  //     {
  //       $push: {
  //         comments: {
  //           comment,
  //           author,
  //         },
  //       },
  //     }
  //   );
  //   res.status(200).json({
  //     msg: "comments desde el controllers",
  //     posts: updatedCommentedPost,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = {
  createPost,
  deletePost,
  getPost,
  detailedPost,
  updatePost,
  updatePostComment,
};
