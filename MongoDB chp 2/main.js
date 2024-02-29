// Using mongoose
import mongoose from "mongoose";
import express from "express";
import { Todo } from "./models/Todo.js";

let connection = await mongoose.connect("mongodb://localhost:27017/todo");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const todo = new Todo({
    title: "2 Hours Study",
    desc: "Study of  Mogoose ",
    isDone: true,
  });
  todo.save();

  res.send("Hello, World!");
});
app.get("/about", async (req, res) => {
  let todo = await Todo.findOne({});
  let todoe = await Todo.findByIdAndDelete("65d1fd08a386f1296c67cda7");
  res.json(todoe);
  res.json(todo);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
