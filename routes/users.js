const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const { existEmail, existUserById } = require("../helper/db-validators");

router.post(
  "/",
  [
    check("fullName", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe tener mas de 5 caracteres").isLength({
      min: 5,
    }),
    check("email").custom(existEmail),
    validarCampos,
  ],
  require("../controllers/users").createUser
);

router.get("/", require("../controllers/users").getUser);

router.put(
  "/:id",
  validarJWT,
  check("id", "it is not a valid id").isMongoId(),
  check("id").custom(existUserById),
  validarCampos,
  require("../controllers/users").updateUser
);

router.get(
  "/:id",
  check("id", "it is not a valid id").isMongoId(),
  check("id").custom(existUserById),
  validarCampos,
  require("../controllers/users").detailedUser
);

router.delete(
  "/:id",
  validarJWT,
  check("id", "it is not a valid id").isMongoId(),
  check("id").custom(existUserById),
  validarCampos,
  require("../controllers/users").deleteUser
);

module.exports = router;
