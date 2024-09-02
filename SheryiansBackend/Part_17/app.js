const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user.js");
const postModel = require("./models/post.js");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Middleware
// Protection function for routes

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token == "") {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);

  res.send("l");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.post("/register", async (req, res) => {
  let { name, username, password, email, age } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);

      res.send("registered");
    });
  });
});

app.post("/login", async (req, res) => {
  let { password, email } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);

      res.send("Login successfull");
    } else {
      res.redirect("/login");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
