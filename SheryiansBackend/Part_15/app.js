const express = require("express");
const app = express();
const PORT = 3000;

const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("./models/user.js");

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, password, email, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        password: hash,
        email,
        age,
      });

      let token = jwt.sign({ email }, "shhhh");
      res.cookie("token", token);

      res.send(user);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.send("Something is wrong");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      // Create jwt token and set in browser cookie
      let token = jwt.sign({ email: user.email }, "shhhh");
      res.cookie("token", token);

      res.send("Login Successfully");
    } else {
      res.send("Something is wrong");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(PORT);
