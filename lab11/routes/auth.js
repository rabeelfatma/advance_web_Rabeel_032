const express = require('express');
const router = express.Router(); 

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 