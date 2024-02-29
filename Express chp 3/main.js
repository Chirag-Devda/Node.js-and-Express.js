// Understanding middleware

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
//Middleware
app.use(express.static("public"));

//Middleware 1
app.use((req, res, next) => {
  fs.appendFileSync("c.txt", `${Date.now()} is a ${req.method} request \n`);
  console.log(`${Date.now()} is a ${req.method} request`);
  req.chirag = "thanks for you support";
  next(); // next use to run next middleware after this and this important
});

//Middleware 2
app.use((req, res, next) => {
  console.log("m2");
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/contact", (req, res) => {
  res.send("contact " + req.chirag);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
