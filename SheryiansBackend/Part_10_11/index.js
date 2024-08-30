const express = require("express");
const app = express();
const PORT = 3000;

const userModel = require("./models/User.js");

app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    email: "chirag22@gmail.com",
    Age: 19,
    username: "bantai_ly_999",
    name: "Rahul Devda",
  });
  res.send(user);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});

app.get("/update", async (req, res) => {
  let userUpdate = await userModel.findOneAndUpdate(
    { name: "Chirag Devda" },
    { Age: 100 },
    { new: true }
  );

  res.send(userUpdate);
});

app.get("/delete", async (req, res) => {
  let user = await userModel.findOneAndDelete({ name: "Rahul Devda" });
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`Server run successfully on http://localhost:${PORT}`);
});
