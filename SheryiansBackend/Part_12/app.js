const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");
const userModel = require("./models/user.js");
const user = require("./models/user.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.post("/create", async (req, res) => {
  let { imageurl, name, email } = req.body;

  let user = await userModel.create({
    name: name,
    image: imageurl,
    email: email,
  });

  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("update", { user });
});

app.post("/update/:id", async (req, res) => {
  let { imageurl, name, email } = req.body;
  await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { imageurl, name, email },
    { new: true }
  );

  res.redirect("/read");
});

app.listen(PORT);
