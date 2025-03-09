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
status : {
  type: String,
  enum: ["active", "inactive"],
  default: "active"
},
monthly_spending :{
  type: String,
  default:0
},
annual_spending :{
  type: String,
  default:0
},
monthly_saving :{
  type: String,
  default:0
},
monthly_earning :{
  type: String,
  default:0
},
currency:{
  type: String,
  enum: ["INR", "USD", "EUR", "GBP"],
  default: "INR"
},
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

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
