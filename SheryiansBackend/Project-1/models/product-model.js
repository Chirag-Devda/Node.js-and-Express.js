const mongoose = require("../config/db.js");

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  discount: { type: Number, default: 0 },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
