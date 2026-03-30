const Transaction = require("../models/Transaction");

// ✅ ADD TRANSACTION
exports.add = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ msg: "Title & Amount required" });
    }

    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category,
      date,
    });

    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    console.log("ADD ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ GET ALL
exports.getAll = async (req, res) => {
  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ DELETE
exports.delete = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ UPDATE
exports.update = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};