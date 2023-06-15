const router = require("express").Router();

const homeController = require("./controllers/homeController.js");
const userController = require("./controllers/userController.js");
const petController = require("./controllers/petController.js");

router.use(homeController);
router.use("/users", userController);
router.use("/pets", petController);
router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
