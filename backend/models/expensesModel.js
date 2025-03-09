const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
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
   expense_date :{
    type : Date
   }
    },
    {
      timestamps: true,
    }
);
module.exports = mongoose.model("Expense", expenseSchema);
