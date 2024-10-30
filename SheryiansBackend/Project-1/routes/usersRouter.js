const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  logoutUser,
} = require("../controllers/usersControllers");

router.get("/", function (req, res) {
  res.send("hey this is users route");
});

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

module.exports = router;
