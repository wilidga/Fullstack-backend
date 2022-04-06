const createError = require("http-errors");
const User = require("../models/users");

const existEmail = async (email) => {
  let user = await User.findOne({ email });

  if (user) {
    throw createError(501, "user already register");
  }
};
const existUserById = async (id) => {
  let user = await User.findById(id);

  if (!user) {
    throw createError(400, "user does not exist in the DB!");
  }
};

module.exports = { existEmail, existUserById };
