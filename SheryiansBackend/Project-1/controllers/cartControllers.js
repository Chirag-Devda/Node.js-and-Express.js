const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

exports.getCartItems = async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart.product");

  let totalBill = 0;

  const cartItems = user.cart.map((item) => {
    // Convert the image buffer to a Base64 string
    if (item.product.image) {
      item.product.image = `data:image/jpeg;base64,${item.product.image.toString(
        "base64"
      )}`;
    }

    // Add to total bill
    totalBill += item.product.price * item.quantity;

    return item; // Return the modified item
  });

  res.render("cart", { cartItems, totalBill });
};

exports.addToCart = async function (req, res) {
  try {
    const productId = req.params.productid;
    const quantity = req.body.quantity || 1; // Get quantity from request body (default to 1)

    // Find the product by ID
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the product is already in the user's cart
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (cartItem) {
      // If the product is already in the cart, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it to the cart
      user.cart.push({ product: productId, quantity });
    }

    // Save the updated user document
    await user.save();

    // Return the updated cart
    // res.status(200).json({ message: "Product added to cart", cart: user.cart });

    req.flash("success", "product added to cart");
    res.redirect("/shop");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCartQuantity = async function (req, res) {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    // Covert Quantity into integer and valid it
    const updatedQuantity = parseInt(quantity);
    if (isNaN(updatedQuantity)) {
      return res.status(400).send("Invalid quantity");
    }

    // Find User
    const user = await userModel.findOne({ email: req.user.email });

    // Find the specific cart item
    const cartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).send("Product not found !");
    }

    if (cartItem) {
      if (updatedQuantity <= 0) {
        // Remove the item if quantity is 0 or less
        user.cart = user.cart.filter(
          (item) => item.product.toString() !== productId
        );
      } else {
        cartItem.quantity = updatedQuantity;
      }
      console.log(cartItem);
      await user.save();
    }
    res.redirect("/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating cart");
  }
};

exports.deleteCartItem = async function (req, res) {
  try {
    const { productId } = req.params;

    // Find the user and update their cart
    const user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );
    await user.save();

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting item from cart");
  }
};
