const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const isOwner = require("../middlewares/isOwner");
const {
  showCreateProductForm,
  createProduct,
  deleteProduct,
  showUpdateProductForm,
  updateProduct,
} = require("../controllers/productControllers");

router.get("/create", isOwner, showCreateProductForm);

// create product
router.post(
  "/create",
  isOwner,
  upload.single("image"),
  createProduct // Handle image upload
);

// Update product get
router.get("/edit/:productId", isOwner, showUpdateProductForm);

// Update Product post
router.post(
  "/update/:productId",
  isOwner,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.post("/delete/:productId", isOwner, deleteProduct);

module.exports = router;
