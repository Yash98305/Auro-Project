const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        name: {
            type: String,
        },

        type: {
            type: String,
            enum:["income", "expense"],
        },
        
        budget:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Category", categorySchema);
