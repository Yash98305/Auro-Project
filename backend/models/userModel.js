const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
  },
  avatar: {
    type: String,

  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  reputation: {
    ratings: [{ type: Number }], // Array to store ratings
    badges: [{ type: String }], // e.g., ["Trusted Seller", "Eco Hero"]
  },
  transactionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
},{ timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {});
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
