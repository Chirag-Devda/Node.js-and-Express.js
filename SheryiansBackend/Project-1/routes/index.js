const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.cookies.token) {
    return res.render("index", { messages: req.flash() });
  }

  return res.redirect("/shop");
});

module.exports = router;
