const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Chal raha hai bhai ${username}`);
});

app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`);
});
