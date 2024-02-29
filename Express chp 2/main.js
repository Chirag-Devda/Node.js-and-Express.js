/** Topics 
 1) Handling post,get,put,delete and  other request 
 2) Chaining of request
 3)Serving Html files 
 4)Installing postman 
 5)Express Router
 */

/*
const express = require("express");
const app = express();
const port = 3000; // You can change this to any port you prefer

app
  .get("/", (req, res) => {
    res.send("Hello this is Get home page ");
  })
  .post("/", (req, res) => {
    res.send("Hello this is post home page ");
  })
  .get("/api", (req, res) => {
    res.json({ 1: "Rahul", 2: "Sahil", 3: "Chirag", sirnames: ["Devda"] });
  });

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
*/

// Express Routers

const express = require("express");
const Blogs = require("./routers/Blogs");
const Shops = require("./routers/Shops");

const app = express();
const port = 3000;

app.use("/Blogs", Blogs);
app.use("/Shops", Shops);

app.get("/", (req, res) => {
  res.send("this is for routers");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
