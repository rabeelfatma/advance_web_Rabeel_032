const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.json({ msg: "Signup successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    res.json({ msg: "Login successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;