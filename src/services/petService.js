const Pet = require("../models/Pet.js");

exports.create = (petData) => Pet.create(petData);
exports.getAllPets = () => Pet.find().populate("owner").lean();
exports.getOnePet = (petId) => Pet.findById(petId).populate("owner").lean();
// exports.getOnePet = (petId) => Pet.findOne({"_id": petId}).populate("owner").lean();
exports.addComment = async (petId, username, comment) => {
  const pet = await Pet.findById(petId);

  pet.comments.push({ username, comment });

  return pet.save();
};
exports.deletePet = (petId) => Pet.findByIdAndDelete(petId);
exports.update = (petId, petData) =>
  Pet.findByIdAndUpdate(petId, petData, { runValidators: true });

exports.getAllbyOneUser = (userId) => Pet.find({owner: userId}).lean()
