const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  previewImages: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

mongoose.model("Product", productSchema);
