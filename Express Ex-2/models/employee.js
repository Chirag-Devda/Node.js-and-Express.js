import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  Salary: Number,
  Language: String,
  City: String,
  isManager: Boolean,
});
export const employee = mongoose.model("employee", employeeSchema);
