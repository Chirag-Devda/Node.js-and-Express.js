const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact: Number,
  picture: String,
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
