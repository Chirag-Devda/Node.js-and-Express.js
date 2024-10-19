const mongoose = require("../config/db.js");

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  isadmin: Boolean,
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
