const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let siteName = "Zorko";
  let webowner = "chirag";
  let arr = ["clothes ", "Acesserios"];
  res.render("index", { webowner: webowner, siteName: siteName, arr });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
