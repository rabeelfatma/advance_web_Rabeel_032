const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// CREATE
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ ONE
router.get('/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// UPDATE
router.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

// DELETE
router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
});

module.exports = router;