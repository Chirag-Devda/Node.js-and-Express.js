const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/SheryMongoPractice_Part_10`);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  Age: Number,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
