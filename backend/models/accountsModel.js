const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Types.ObjectId,
            ref : "User"
        },
        name: {
            type: String,
        },
        balance: {
            type:String ,
        },
        type: {
            type: String,
        },
        status:{
            type: String,
            enum:["Active","Inactive"],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Account", accountSchema);
