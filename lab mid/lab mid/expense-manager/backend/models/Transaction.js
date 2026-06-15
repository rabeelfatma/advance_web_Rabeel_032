const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    type: String,
    category: String,
    date: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);