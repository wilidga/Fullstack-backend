const express = require("express");
const { subirArchivo } = require("../helper/subiendoArchivos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = express.Router();

router.post(
  "/",
  subirArchivo,
  validarJWT,
  require("../controllers/posts").createPost
);

router.get("/", require("../controllers/posts").getPost);

router.put("/:id", validarJWT, require("../controllers/posts").updatePost);
//router.post("/:id/comments", require("../controllers/posts").updatePostComment);

router.get("/:id", require("../controllers/posts").detailedPost);

router.delete("/:id", validarJWT, require("../controllers/posts").deletePost);

module.exports = router;
