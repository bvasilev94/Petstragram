const User = require("../models/User.js");
const jwt = require("../utils/jwt.js");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/constants.js");

exports.login = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Wrong username or password");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Wrong username or password!");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "2d" });

  return token;
};
exports.register = (userData) => User.create(userData);

