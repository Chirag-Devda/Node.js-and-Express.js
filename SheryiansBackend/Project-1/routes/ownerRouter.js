const express = require("express");
const router = express.Router();
const isOwner = require("../middlewares/isOwner");
const {
  createOwner,
  showLoginForm,
  loginOwner,
} = require("../controllers/ownerControllers");

if (process.env.NODE_ENV === "development") {
  router.post("/register", createOwner);
}

router.get("/login", showLoginForm);

router.post("/login", loginOwner);

router.get("/dashboard", isOwner);

module.exports = router;
