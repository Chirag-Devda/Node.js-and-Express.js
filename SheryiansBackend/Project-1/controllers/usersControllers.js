const userModel = require("../models/user-model");
const userValidationSchema = require("../validation/User-Validation");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

module.exports.createUser = async function (req, res) {
  // Validate the user input based on the uservalidationSchema
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    let { fullname, email, password } = req.body;

    // Check if a user with the same email already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // If user exists, send a 409 (Conflict) status
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    let newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    // Generate token
    let token = generateToken(newUser);
    res.cookie("token", token, { httpOnly: true }); // Secure the cookie

    // Send success response
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or Password incorrect" });
    }

    // Compare password and handle the result explicitly
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ message: "Login Successfull" });
    } else {
      return res.status(401).json({ message: "Email or Password incorrect" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports.logoutUser = async function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
