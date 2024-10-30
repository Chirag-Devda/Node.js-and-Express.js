const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

module.exports = router;
