const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la peticion",
    });
  }
  const token = authorization.slice(7, authorization.lenght);
  try {
    // const { name, _id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const verify = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req._id = verify._id;
    req.role = verify.role;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};
