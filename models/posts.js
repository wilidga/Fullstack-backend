const { model, Schema } = require("mongoose");

const postSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    postBody: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
    images: {
      type: String,
      required: false,
    },
    //  comments: [CommentSchema],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        autopopulate: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model(
  "Posts",
  postSchema.plugin(require("mongoose-autopopulate"))
);
