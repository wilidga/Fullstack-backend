const User = require("../models/users");
const createError = require("http-errors");
const { hashPassword } = require("../helper/bcrypt");

const createUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const user = await new User({
      fullName,
      email,
      password,
      role,
    });
    user.password = await hashPassword(password);
    await user.save();

    res.status(200).json({ ok: true, users: user });
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const detailedUser = async (req, res) => {
  const { id } = req.params;
  try {
    const existUser = await User.findById(id);
    res.status(200).json({ ok: true, users: existUser });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, password } = req.body;

  try {
    const existUser = await User.findById(id);

    if (req._id !== existUser._id.toString() && req.role !== "administrator") {
      throw createError(400, "unauthorized");
    }
    if (password) {
      newPassword = await hashPassword(password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { fullName, password: newPassword },
      { new: true }
    );

    res.status(200).json({ ok: true, users: updatedUser });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const existUser = await User.findById(id);

    if (req._id !== existUser._id.toString() && req.role !== "administrator") {
      throw createError(400, "unauthorized");
    }

    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ ok: true, users: deletedUser });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(error.status).json({ ok: false, msg: error.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  detailedUser,
  updateUser,
};
