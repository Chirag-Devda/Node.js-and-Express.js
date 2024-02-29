const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public")); //any folder under public folder is publically available

app.get("/", (req, res) => {
  res.send("Hello Duniya !");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});

app.get("/about/:slug", (req, res) => {
  // Request parameters and query
  // for url : http://localhost:3000/about/chirag/?mode=cool&Smart
  console.log(req.params); //{ slug: 'chirag' }
  console.log(req.query); //{ mode: 'cool', Smart: '' }

  res.send(
    `<h1 style = color:red;text-align:center>Hello ${req.params.slug}</h1> `
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
