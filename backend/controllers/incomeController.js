const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const Income = require("../models/incomeModel.js");
const Account = require("../models/accountsModel.js");
const Category = require("../models/categoriesModel.js");
const fs = require("fs");
exports.createController = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user._id
    const {title,amount,accountId,categoryId,income_date} = req.body
    
    const currentAmount = await Account.findById(accountId)
    const t =Number(amount)+Number(currentAmount.balance);
    await Account.findByIdAndUpdate(accountId,{balance:t})

    const income = new Income({userId,title,amount,accountId,categoryId,income_date})
    
    await income.save();
    res.status(201).send({
        success: true,
        message: "income added successfully",
        income
    });
})
exports.getController = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user._id
    const income = await Income.find({userId}).populate("accountId").populate("categoryId")    
    res.status(200).send({
        success: true,
        message: "income fetched successfully",
        income,
    });
})
exports.deleteIncome = catchAsyncErrors(async (req, res) =>{
    const {id} = req.params;
    await Income.findByIdAndDelete(id)
            res.status(200).json({
                success : true,
                message: 'Income Deleted'
            })
})
exports.getTotalIncomeOfUser = catchAsyncErrors(async (req, res) =>{
    const userId = req.user._id
    const income = await Income.find({userId}).populate("accountId").populate("categoryId")
    const totalIncome = income.reduce((a,b)=>{
        return Number(a)+Number(b.amount)
    },0)
    res.status(200).send({
        success: true,
        message: "income fetched successfully",
        totalIncome
    });
})