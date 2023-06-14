const jwt = require("../utils/jwt.js");
const { SECRET } = require("../utils/constants.js");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const user = await jwt.verify(token, SECRET);

      req.user = user;
      res.locals.user = user;
      res.locals.isAuth = true;

      next();
    } catch (error) {
      res.clearCookie("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/users/login");
  }

  next();
};
