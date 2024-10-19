const mongoose = require("mongoose");

const dbURI = "mongodb://localhost:27017/Backend-Project-1-ecommerce";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = mongoose;
