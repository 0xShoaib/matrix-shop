const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");

router.get("/allproducts", (req, res) => {
  Product.find()
    .select("title price _id inStock thumbnail")
    .then((products) => {
      return res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/product/:id", (req, res) => {
  Product.findById(req.params.id)
    .select("-previewImages")
    .then((product) => {
      return res.json({ product });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addproduct", (req, res) => {
  const {
    title,
    thumbnail,
    previewImages,
    price,
    description,
    inStock,
  } = req.body;

  if (!title || !thumbnail || !previewImages || !price || !description) {
    return res.status(422).json({ error: "Please add all the feilds" });
  }

  const product = new Product({
    title,
    thumbnail,
    previewImages,
    price,
    description,
    inStock,
  });

  product
    .save()
    .then((result) => {
      return res.json({ product: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
