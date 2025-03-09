const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref : "User"
    },
    title: {
      type: String,
    },
    amount: {
      type: String,
    },
    accountId: {
        type: mongoose.Types.ObjectId,
        ref : "Account"
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref : "Category"
    },
    income_group: {
      type: String,
    },
    income_date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Income", incomeSchema);
