const router = require("express").Router();

const userService = require("../services/userService.js");
const { extractErrMessages } = require("../utils/errorHandler.js");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.login(username, password);

    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const errMessages = ["Incorrect username or password"];
    res.status(404).render("users/login", { errMessages });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    await userService.register({ username, email, password, repeatPassword });

    const token = await userService.login(username, password);

    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (err) {
    const errMessages = extractErrMessages(err);
    res.status(404).render("users/register", { errMessages });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
