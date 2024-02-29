import express from "express";
import path from "path";
import mongoose from "mongoose";
import { employee } from "./models/employee.js";
const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use(express.static("public"));

await mongoose.connect("mongodb://localhost:27017/Company");
let basepath =
  "C:\\Users\\Rahul\\Documents\\web development\\Node.js and Express.js\\Express Ex-2";
app.get("/", (req, res) => {
  res.render("index", { foo: "FOO" });
});

function data(arr) {
  let random = Math.floor(Math.random() * (arr.length - 1));
  return arr[random];
}
app.get("/generate", async (req, res) => {
  await employee.deleteMany({});
  let Names = ["Chirag", "Rahul", "Sahil", "Khushal"];
  let City = ["Mumbai", "Pune", "Udaipur", "Surat", "Falna"];
  let Language = ["java", "python", "js", "C++", "C"];
  for (let index = 0; index < 10; index++) {
    let e = await employee.create({
      name: data(Names),
      Salary: Math.floor(Math.random() * 1480000) + 20000,
      Language: data(Language),
      City: data(City),
      isManager: Math.floor(Math.random() * 100) > 50 ? true : false,
    });
    console.log(e);
    e.save();
  }

  res.sendFile(path.join(basepath, "public", "style.css"));
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
