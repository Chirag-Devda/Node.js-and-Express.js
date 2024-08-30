const express = require("express");
const app = express();
const PORT = 3000;

const path = require("path");
const fs = require("fs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
  });
});

app.get("/files/:filename", (req, res) => {
  const fileName = req.params.filename;
  const capitalizeFileName = fileName.replace(
    fileName[0],
    fileName[0].toUpperCase()
  );
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    res.render("show", { fileName: capitalizeFileName, filedata: filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  const fileName = req.params.filename;
  res.render("edit", { fileName: fileName });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
});

app.post("/edit", (req, res) => {
  const newName = req.body.New.split(".")[0];

  fs.rename(`./files/${req.body.previous}`, `./files/${newName}.txt`, (err) => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}`);
});
