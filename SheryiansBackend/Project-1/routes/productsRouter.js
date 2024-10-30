const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModal = require("../models/product-model");
const productValidationSchema = require("../validation/Product-Validation");

router.post(
  "/createProduct",
  upload.single("image"),
  async function (req, res) {
    const { error } = productValidationSchema.validate({
      ...req.body,
      image: req.file ? req.file.buffer : null,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      const { name, bgcolor, price, panelcolor, textcolor, discount } =
        req.body;
      let product = await productModal.create({
        name,
        bgcolor,
        price,
        textcolor,
        panelcolor,
        discount,
        image: req.file.buffer,
      });

      // Respond with the created product
      res.status(201).send(product);
    } catch (error) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "An error occurred while creating the product.",
      });
    }
  }
);

module.exports = router;
