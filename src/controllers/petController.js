const router = require("express").Router();
const petServices = require("../services/petService.js");

const { extractErrMessages } = require("../utils/errorHandler.js");
const { isAuth } = require("../middlewares/authMiddleware.js");

router.get("/catalog", async (req, res) => {
  try {
    const pets = await petServices.getAllPets();

    res.render("pets/catalog", { pets });
  } catch (err) {
    res.redirect("/404");
  }
});

router.get("/add-photo", (req, res) => {
  res.render("pets/create");
});

router.post("/add-photo", isAuth, async (req, res) => {
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

router.get("/details/:petId", async (req, res) => {
  console.log(req.params.petId);
  try {
    const pet = await petServices.getOnePet(req.params.petId);
    const isOwner = req.user?._id === pet.owner?._id.toString();
    const comments = pet.comments;

    let isLoggedInAndNotOwner = res.locals.isAuth;

    console.log(comments);
    if (isOwner) {
      isLoggedInAndNotOwner = false;
    }
    res.render("pets/details", {
      pet,
      isOwner,
      isLoggedInAndNotOwner,
      comments,
    });
  } catch (error) {
    res.redirect("/404");
  }
});

router.post("/details/:petId", isAuth, async (req, res) => {
  const petId = req.params.petId;
  const username = req.user.username;
  const { comment } = req.body;
  try {
    await petServices.addComment(petId, username, comment);
    res.redirect(`/pets/details/${petId}`);
  } catch (err) {
    res.redirect(`/404`);
  }
});

router.get("/details/:petId/delete", isAuth, async (req, res) => {
  console.log(req.params.petId);
  try {
    await petServices.deletePet(req.params.petId);

    res.redirect("/pets/catalog");
  } catch (error) {
    res.redirect("/404");
  }
});

router.get("/details/:petId/edit", isAuth, async (req, res) => {
  try {
    const pet = await petServices.getOnePet(req.params.petId);
    res.render("pets/edit", { pet });
  } catch (error) {
    res.redirect("/404");
  }
});

router.post("/details/:petId/edit", isAuth, async (req, res) => {
  const petId = req.params.petId;
  const { ...pet } = req.body;
  try {
    await petServices.update(petId, pet);
    res.redirect(`/pets/details/${petId}`);
  } catch (error) {
    const errMessages = extractErrMessages(error);
    res.status(404).render("pets/edit", { pet, errMessages });
  }
});

module.exports = router;
