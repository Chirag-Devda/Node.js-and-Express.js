const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");

router.get("/", isLoggedin, async (req, res) => {
  try {
    let products = await productModel.find();

    // Convert image buffers to base64 strings
    products.forEach((product) => {
      if (product.image) {
        product.image = Buffer.from(product.image, "binary").toString("base64");
      }
    });

    res.render("shop", { products, messages: req.flash() });
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
});

module.exports = router;
