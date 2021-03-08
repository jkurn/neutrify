const mongoose = require("mongoose");

const schema = mongoose.Schema({
  gtin_id: String,
  price: Number,
  instacart_id: String,
  name: String,
});

module.exports = mongoose.model("Product", schema);
