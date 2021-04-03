/**
 * Route URL: /api/mock/[routes]
 *
 * [GET] - View list of mock products (not used)
 * [GET] - View product based on id
 * [POST] - Submit new mock product (not used)
 *
 */

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

/**
 * [GET] - View list of mock products
 * @param {object} Application (refer to Application Model)
 * @return {array} 200 - [Product]
 */
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

/**
 * [GET] - View product based on id
 * @param {string} _id 
 * @return {object} 200 - Product
 */
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id }).lean();
    res.send(product);
  } catch(err) {
    res.status(404);
    res.send({ error: err });
  }
});

/**
 * [POST] - Submit new mock product
 *
 * @param {object} Product (refer to Product Model)
 * @return {object} 200 - Product
 */
router.post("/product", async (req, res) => {
  const product = new Product(req.body);

  await product.save();

  res.send(product);
});

module.exports = router;
