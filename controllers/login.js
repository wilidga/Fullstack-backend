const User = require("../models/users");

const { comparePassword } = require("../helper/bcrypt");

const { generateJWT } = require("../helper/generateJWT");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login");

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(404).json({ msg: "password/email problem pass" });
  }

  const { password: dbPassword, _id, firstName, role } = foundUser;
  const match = await comparePassword(password, dbPassword);
  if (!match) {
    return res.status(404).json({ msg: "password/email problem pass" });
  }

  const token = await generateJWT(_id, firstName, role);

  return res.status(200).json({ token, user: foundUser });
};

module.exports = { login };
