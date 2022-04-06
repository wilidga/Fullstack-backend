const { model, Schema } = require("mongoose");

const CommentSchema = Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    autopopulate: true,
  },
  comment: {
    type: String,
    required: true,
  },
  image: { type: String, required: false },
});
module.exports = model(
  "Comment",
  CommentSchema.plugin(require("mongoose-autopopulate"))
);
