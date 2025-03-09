import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    transactionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ["Completed", "Cancelled"], default: "Completed" },
    rating: { type: Number, min: 1, max: 5 }, // Buyer rates seller
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
