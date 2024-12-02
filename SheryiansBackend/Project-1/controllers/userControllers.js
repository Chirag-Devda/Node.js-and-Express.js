const userModel = require("../models/user-model");
const userValidationSchema = require("../validation/User-Validation");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

exports.createUser = async function (req, res) {
  // Validate the user input based on the uservalidationSchema
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    req.flash("error", error.details[0].message);
    return res.status(400).redirect("/");
  }

  try {
    let { fullname, email, password } = req.body;

    // Check if a user with the same email already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "User already exists. Please login.");
      return res.status(409).redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    let newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    await newUser.save();

    // Generate token
    let token = generateToken(newUser);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    }); // Secure the cookie

    req.flash("success", "Registered successfully");
    res.redirect("/shop");
  } catch (error) {
    console.error("Error during registration:", error);
    req.flash("error", "An unexpected error occurred. Please try again.");
    res.status(500).redirect("/");
  }
};

exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      req.flash("error", "Email or Password Incorrect");
      return res.redirect("/");
    }

    // Compare password and handle the result explicitly
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      // return res.status(200).json({ message: "Login Successfull" });
      req.flash("success", "Login successfully");
      res.redirect("/shop");
    } else {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Login Error:", error.message);

    req.flash("error", "An unexpected error occurred. Please try again.");
    return res.redirect("/login");
  }
};

exports.logoutUser = async function (req, res) {
  // Clear the token cookie explicitly
  res.cookie("token", " ", {
    httpOnly: true, // Ensures cookie cannot be accessed via client-side scripts
    secure: process.env.NODE_ENV === "production", // Cookie only sent over HTTPS in production
    expires: new Date(0), // Immediately expires the cookie
  });

  // Redirect to home or login page after logout
  res.redirect("/");
};
