const Category = require("../models/categoriesModel.js");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.createController = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const {name,type,budget} = req.body
    const category = new Category({name,type,budget,userId})
await category.save();
res.status(201).send({
    success: true,
    message: "Category added successfully",
    category
})
})

exports.getCategory = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const categories = await Category.find({userId})
    res.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        categories
    })
})
exports.getIncomeCategory = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const categories = await Category.find({userId,type:"income"}).select("name")
    res.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        categories
    })
})
exports.getExpenseCategory = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id
    const categories = await Category.find({userId,type:"expense"}).select("name")
    res.status(200).send({
        success: true,
        message: "Categories fetched successfully",
        categories
    })
})

exports.updateCategory = catchAsyncError(async(req,res,next)=>{
    const categoryId = req.params.id
    const {name,type,budget} = req.body
    const category = await Category.findOneAndUpdate({categoryId},{name,type,budget},{new:true})
    res.status(200).send({
        success: true,
        message: "Category updated successfully",
        category
    })
})

exports.deleteCategory = catchAsyncError(async(req,res,next)=>{
    const deleteId = req.params.id
    await Category.findOneAndDelete(deleteId)
    res.status(200).send({
        success: true,
        message: "Category deleted successfully"
    })
})