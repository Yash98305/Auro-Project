const mongoose = require("mongoose") ;

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ["Electronics", "Furniture", "Clothing","Books", "Other"] },
    price: { type: Number, required: true },
    condition: { type: String, enum: ["New", "Used", "Fair"], required: true },
    images: [{  data: Buffer,
      contentType: String, }],
    location: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Available", "Sold", "Traded"], default: "Available" },
    reviews: [
      {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }
      }
  ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
