const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/SheryMongoPractice_Part_11`);

const userSchema = mongoose.Schema({
  image: String,
  name: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
