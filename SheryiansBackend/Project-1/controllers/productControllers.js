const productValidationSchema = require("../validation/Product-Validation");
const productModal = require("../models/product-model");

exports.showCreateProductForm = function (req, res) {
  res.render("addProduct", { messages: req.flash() }); // render create product form page
};

exports.createProduct = async function (req, res) {
  const isActiveBoolean = req.body.isActive === "on";

  // Construct the data to validate
  let dataToValidate = {
    ...req.body,
    isActive: isActiveBoolean,
    image: req.file ? req.file.buffer : undefined,
  };

  // Validate the incoming data with Joi
  const { error } = productValidationSchema.validate(dataToValidate);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    // Destructure fields
    const {
      name,
      price,
      imageUrl,
      discount,
      description,
      category,
      stockQuantity,
      tags,
      salesTaxRate,
    } = req.body;

    // Ensure image is either uploaded as a file or URL is provided
    if (!req.file && !imageUrl) {
      return res.status(400).send("Image file or URL is required.");
    }

    if (req.file && imageUrl) {
      return res.status(400).send("Upload only one file or Url");
    }

    // Create the product in the database
    let product = await productModal.create({
      name,
      price,
      image: req.file ? req.file.buffer : undefined, // Store buffer if uploaded, null if not
      imageUrl: imageUrl || undefined, // Store imageUrl if provided, otherwise null
      discount,
      description,
      category,
      stockQuantity,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], // Ensure tags is an array
      salesTaxRate: salesTaxRate || 0,
      isActive: isActiveBoolean, // Ensure isActive is boolean
    });

    req.flash("success", "Product created successfully");
    res.redirect("/shop");
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "An error occurred while creating the product.",
    });
  }
};

exports.showUpdateProductForm = async function (req, res) {
  const { productId } = req.params;

  try {
    const product = await productModal.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Convert the image buffer to a base64 string
    const base64Image = product.image.toString("base64");

    // Pass the base64 image to the EJS template
    res.render("updateProduct", {
      product: product,
      base64Image: base64Image,
      messages: req.flash(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product details" });
  }
};

exports.updateProduct = async function (req, res) {
  const { productId } = req.params;
  const isActiveBoolean = req.body.isActive === "on";
  // Construct the data to validate
  let dataToValidate = {
    ...req.body,
    isActive: isActiveBoolean,
  };

  // Validate the incoming data with Joi
  const { error } = productValidationSchema.validate(dataToValidate);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }

  try {
    // Destructure fields
    const {
      name,
      price,
      discount,
      description,
      category,
      stockQuantity,
      tags,
      salesTaxRate,
    } = req.body;

    // Prepare updated fields
    const updatedFields = {
      name,
      price,
      discount,
      description,
      category,
      stockQuantity,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], // Ensure tags is an array
      salesTaxRate: salesTaxRate || 0,
      isActive: isActiveBoolean, // Ensure isActive is boolean
    };

    // Update the product in the database
    const updatedProduct = await productModal.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    req.flash("success", "Product updated successfully");
    res.redirect(`/shop`);
  } catch (err) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "An error occurred while updating the product.",
    });
  }
};

exports.deleteProduct = async function (req, res) {
  const { productId } = req.params;
  console.log("id", productId);

  try {
    const deleteProduct = await productModal.findByIdAndDelete(productId);
    console.log(deleteProduct);

    if (!deleteProduct) {
      req.flash("error", "Product not found or already deleted");
      return res.send("Product not found or already deleted");
    }

    req.flash("success", "Product deleted successfully");
    return res.send("product deleted successfully");
  } catch (error) {
    res.status(500).json({
      status: "error",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "error occured during deleting product",
    });
  }
};
