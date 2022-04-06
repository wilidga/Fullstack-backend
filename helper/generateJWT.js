const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (_id, name, role) => {
  return new Promise((resolve, reject) => {
    const payload = { _id, name, role };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "3h",
      },
      (err, token) => {
        if (err) {
          reject("the token could not be generated");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
