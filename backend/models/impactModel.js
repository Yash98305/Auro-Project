import mongoose from "mongoose";

const ImpactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemsReused: { type: Number, default: 0 },
    co2Savings: { type: Number, default: 0 }, // Estimated CO₂ savings in kg
    landfillReduction: { type: Number, default: 0 }, // Estimated landfill waste reduction in kg
  },
  { timestamps: true }
);

export default mongoose.model("Impact", ImpactSchema);
