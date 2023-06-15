const Pet = require("../models/Pet.js");

exports.create = (petData) => Pet.create(petData);
exports.getAllPets = async () => {
  const pets = await Pet.find().lean();
    
  return pets;
};
