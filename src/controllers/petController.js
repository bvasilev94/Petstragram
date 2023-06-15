const router = require("express").Router();
const petServices = require("../services/petService.js");

const { extractErrMessages } = require("../utils/errorHandler.js");

router.get("/catalog", async (req, res) => {
  try {
    const pets = await petServices.getAllPets();
    console.log(pets);
    res.render("pets/catalog", { pets });
  } catch (err) {

  }
});

router.get("/add-photo", (req, res) => {
  res.render("pets/create");
});

router.post("/add-photo", async (req, res) => {
  const { name, age, description, location, imageUrl } = req.body;

  try {
    await petServices.create({
      name,
      age: Number(age),
      description,
      location,
      imageUrl,
      owner: req.user._id,
    });
    res.redirect("/pets/catalog");
  } catch (error) {
    const errMessages = extractErrMessages(error);
    res.status(404).render("pets/create", { errMessages });
  }
});

module.exports = router;
