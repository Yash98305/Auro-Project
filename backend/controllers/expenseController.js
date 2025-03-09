const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const Expense = require("../models/expensesModel.js");
const fs = require("fs");
const Account = require("../models/accountsModel.js");

exports.createController = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user._id
    const {title,amount,accountId,categoryId,expense_date} = req.body
    const currentAmount = await Account.findById(accountId)
    const t =Number(currentAmount.balance)-Number(amount)
    if(t<0){
        return next(new ErrorHandler("Insufficient balance",400))
    }
    await Account.findByIdAndUpdate(accountId,{balance:t})
    const expense = new Expense({userId,title,amount,accountId,categoryId,expense_date})
    await expense.save();
    res.status(201).send({
        success: true,
        message: "expense added successfully",
        expense
    });
})
exports.getController = catchAsyncErrors(async(req,res,next)=>{
    const userId = req.user._id
    const expense = await Expense.find({userId}).populate("accountId").populate("categoryId")
    res.status(200).send({
        success: true,
        message: "expense fetched successfully",
        expense,
    });
})

exports.deleteExpense = catchAsyncErrors( async (req, res) =>{
    const {id} = req.params;
    await Expense.findByIdAndDelete(id)
    
            res.status(200).json({
                success: true,
                message: 'Expense Deleted'})
        })
exports.getTotalExpenseOfUser = catchAsyncErrors(async (req, res) =>{
            const userId = req.user._id
            const expense = await Expense.find({userId}).populate("accountId").populate("categoryId")
            const totalExpense = expense.reduce((a,b)=>{
                return Number(a)+Number(b.amount)
            },0)
            res.status(200).send({
                success: true,
                message: "income fetched successfully",
                totalExpense
            });
        })