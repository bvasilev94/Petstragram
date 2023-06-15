const router = require("express").Router();

const userService = require("../services/userService.js");
const { extractErrMessages } = require("../utils/errorHandler.js");

router.get("/catalog", (req, res) => {
  res.render("pets/catalog");
});

router.get("/add-photo", (req, res) => {
  res.render("pets/create");
});

module.exports = router;
