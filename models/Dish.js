const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    diet: {
      type: [String], // ["vegetarian", "gluten-free", etc.]
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], // core ingredients needed
      required: true,
    },
    extraNeeded: {
      type: [String], // small extras like "oil", "salt"
      default: [],
    },
    instructions: {
      type: [String], // step-by-step cooking instructions
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dish", dishSchema);
