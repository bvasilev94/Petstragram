const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required!"],
  },
  age: {
    type: String,
    required: [true, "Age is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  location: {
    type: String,
    required: [true, "Location is required!"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
