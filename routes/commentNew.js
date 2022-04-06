const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentControllerNew");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { subirArchivo } = require("../helper/subiendoArchivos");
const Comment = require("../models/comment");

router.post(
  "/:id/comments",
  subirArchivo,
  validarJWT,
  [
    //check("author", "it is not a valid id").isMongoId(),
    check("comment", "comment is required").not().isEmpty(),
    validarCampos,
  ],
  commentController.createComment
);
router.get("/:id/comments", commentController.getComment);

router.put(
  "/:id/comments/:commentId",
  subirArchivo,
  validarJWT,
  async (req, res) => {
    const newCommentPrev = req.body;
    console.log(newCommentPrev);

    try {
      if (req.file?.filename) {
        newCommentPrev.image = req.file.filename;
      } else {
        let oldComment = await Comment.findById(req.params.commentId);
        newCommentPrev.image = oldComment.image;
      }
      console.log(newCommentPrev);
      const commentUpdated = await commentController.updateComment(
        req.params.commentId,
        req._id,
        newCommentPrev
      );
      res.json({ msg: "comment updated", comment: commentUpdated });
    } catch (error) {
      res.status(error.status).json({ ok: false, msg: error.message });
    }
  }
);

router.delete("/:id/comments/:commentId", validarJWT, async (req, res) => {
  try {
    const commentDeleted = await commentController.deleteComment(
      req.params.commentId,
      req._id
    );
    res.json({ msg: "deleted", comment: commentDeleted });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
});

router.get("/:id/comments/:commentId", async (req, res) => {
  const commentDetail = await commentController.detailedComment(
    req.params.commentId
  );
  res.json({ msg: "comment detailed", comment: commentDetail });
});

module.exports = router;
