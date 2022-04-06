const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (frontPassword, dbPassword) => {
  const match = await bcrypt.compare(frontPassword, dbPassword);
  return match;
};

module.exports = { hashPassword, comparePassword };
