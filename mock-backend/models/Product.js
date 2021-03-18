const mongoose = require("mongoose");

const schema = mongoose.Schema({
  product_id: String,
  price: Number,
  name: String,
  C02: Number
});

module.exports = mongoose.model("Product", schema);
