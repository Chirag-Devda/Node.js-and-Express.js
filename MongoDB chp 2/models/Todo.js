// making schema for validation using mongoose

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  isDone: Boolean,
  Date: Number,
});
export const Todo = mongoose.model("Todo", TodoSchema);
