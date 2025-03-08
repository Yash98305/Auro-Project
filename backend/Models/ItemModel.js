const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type : String
  },

  category: {
    type : String
  },
  description: {
    type : String
  },
  price: {
    type : Number
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  status: { 
    type: String, 
    enum: ['available', 'sold'], 
    default: 'available' 
  },
});
  module.exports = mongoose.model("Item", itemSchema);
