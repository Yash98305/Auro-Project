const Income = require("../models/incomeModel.js");
const Account = require("../models/accountsModel.js");
const Category = require("../models/categoriesModel.js");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler.js");

exports.createController = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const e = await Account.findOne({userId});
    if(e){
        return next(new ErrorHandler("Account is already associated",200))
    }
    const cash= {
        userId,
        name: "Cash",
        balance: 0,
        type: "My Cash",
        status: "Active"
    }
    const bank ={
        userId,
        name: "Bank",
        balance: 0,
        type: "My Bank",
        status: "Active"
    }
    const paypal ={
        userId,
        name: "Paypal",
        balance: 0,
        type: "My E-Wallet",
        status: "Active"
    }
    const other ={
        userId,
        name: "Others",
        balance: 0,
        type: "Others",
        status: "Active"
    }
    await new Account(cash).save()
    await new Account(bank).save()
    await new Account(other).save()
    await new Account(paypal).save()

res.status(201).send({
    success: true,
    message: "Account Created for this user is successfully",
})
})

exports.getController = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const account = await Account.find({userId})
    res.status(200).send({
        success: true,
        message: "Account fetched successfully",
        account
    })
})
