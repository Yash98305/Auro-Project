const mongoose = require("mongoose") ;

const ReviewSchema = new mongoose.Schema(
  {
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewedUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
