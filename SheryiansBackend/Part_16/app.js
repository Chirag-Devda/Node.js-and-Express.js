const express = require("express");
const app = express();
const PORT = 3000;

const userModel = require("./models/user.js");
const postModel = require("./models/post.js");

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/create/user", async (req, res) => {
  let user = await userModel.create({
    username: "Chirag Devda",
    email: "devdachirag09@gmail.com",
    age: 19,
  });

  res.send(user);
});

app.get("/create/post", async (req, res) => {
  // creating the post by user with refrence of there _id
  let post = await postModel.create({
    postdata: "Hello this is my first post",
    user: "66d5a3bc5e15beb0212e15b4",
  });

  // Adding the post reference _id in the user Document Posts array
  let user = await userModel.findOne({ _id: "66d5a3bc5e15beb0212e15b4" });
  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(PORT);
