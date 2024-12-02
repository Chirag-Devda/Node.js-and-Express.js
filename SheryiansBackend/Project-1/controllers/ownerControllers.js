const ownerModel = require("../models/owner-model");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const productModel = require("../models/product-model");

exports.createOwner = async function (req, res) {
  try {
    let { fullname, email, password } = req.body;

    console.log(req.body);

    // Check if any owner already exists
    let owners = await ownerModel.find();

    if (owners.length > 0) {
      return res
        .status(403) // Use 403 (Forbidden) for permission issues
        .send("You don't have permission to create a new owner.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new owner
    let newOwner = await ownerModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    // Generate token
    let token = generateToken(newOwner);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure cookie in production
    });

    req.flash("success", "Registered successfully");
    res.redirect("/shop");
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", "An unexpected error occurred. Please try again.");
    res.status(500).redirect("/");
  }
};

exports.showLoginForm = async function (req, res) {
  res.render("ownerauth", { messages: req.flash() });
};

exports.loginOwner = async function (req, res) {
  const { email, password } = req.body;

  try {
    // Check if the owner exists in the ownerModel
    let owner = await ownerModel.findOne({ email });

    if (!owner) {
      req.flash("error", "Email or Password Incorrect");
      return res.redirect("/owner/login"); // Redirect back to the login page
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, owner.password);

    if (isMatch) {
      // Generate a token for the owner
      const token = generateToken(owner);

      // Set the token as a cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set secure flag for production
      });

      req.flash("success", "Owner login successful");
      return res.redirect("/shop"); // Redirect to the owner dashboard after login
    } else {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/owner/login"); // Redirect back to the login page
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    req.flash("error", "An unexpected error occurred. Please try again.");
    return res.redirect("/owner/login"); // Redirect back in case of server error
  }
};

exports.ownerDashboard = async function (req, res) {
  try {
    let products = await productModel.find();

    // Convert image buffers to base64 strings
    products.forEach((product) => {
      if (product.image) {
        product.image = Buffer.from(product.image, "binary").toString("base64");
      }
    });

    res.render("dashboard", { products, messages: req.flash() });
  } catch (error) {
    console.error("/dashboard", error.message);
    req.flash("error", "Something went wrong");
    res.status(500).redirect("/shop");
  }
};
