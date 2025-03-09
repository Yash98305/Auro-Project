const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const sendToken = require("../jwtToken/jwtToken.js");
const fs = require("fs");
const Account = require("../models/accountsModel.js");




exports.userLoginController = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

exports.userRegisterController = catchAsyncErrors(async (req, res, next) => { 
  const {name,phone, email, password,avatar } = req.body;
  if (!name|| !phone || !email || !password) {
    return next(new ErrorHandler("Please Enter Required Field", 400));
  }
  const usere = await User.findOne({ email }).select("+password");
  if (usere) {
    return next(new ErrorHandler("Email Exist", 401));
  }
    const user = new User({
      name,phone, email, password,avatar
    });
   const t= await user.save();
   const userId = t._id
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

    sendToken(user, 201, res);
});

exports.getUserDetailsController = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});


// exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.user.id).select("+password");
//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Old password is incorrect", 400));
//   }
//   if (req.body.newPassword !== req.body.conformPassword) {
//     return next(new ErrorHandler("password does not match", 400));
//   }
//   user.password = req.body.newPassword;
//   await user.save();
//   sendToken(user, 200, res);
// });

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  
  const { photo } = req.files;
 
  if(photo && photo.size > 1000000){
    return res
      .status(500)
      .send({ error: "photo is Required and should be less then 1mb" });
}

const user = await User.findByIdAndUpdate(
  req.params.id,
  { ...req.fields},
  { new: true,
    runValidators: true,
    useFindAndModify: false, }
);

if (photo) {
  user.photo.data = fs.readFileSync(photo.path);
  user.photo.contentType = photo.type;
}

await user.save();
  res.status(200).json({
    success: true,
    user
  });
});

exports.getAllUserController = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ _id: { $nin: [(req.body._id)] } });

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getAllUsersPhotoController = catchAsyncErrors(async (req, res,next) => {
  const users = await User.findById(req.params.pid).select("photo");

    if (users.photo.data) {
      res.set("Content-type", users.photo.contentType);
      return res.status(200).send(users.photo.data);
    }
  
})


// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (!user) {
//     return next(
//       new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
//     );
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// exports.logout = catchAsyncErrors(async (req, res, next) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//     httpOnly: true,
//   });
//   res.status(200).json({
//     success: true,
//     message: "Logged Out",
//   });
// });

// exports.postOTPController = catchAsyncErrors(async (req, res, next) => {
//   const { email, otp, newPassword, conformPassword } = req.body;
//   if (newPassword !== conformPassword) {
//     return next(new ErrorHandler("Password Mismatch", 400));
//   }
//   const user = await User.findOne({ email });
//   if (user.otp !== otp) {
//     return next(new ErrorHandler("Invalid OTP, check your email again", 400));
//   }
//   user.password = newPassword;
//   await user.save();
//   sendToken(user, 200, res);
// });

// exports.forgotPasswordController = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }
//   function generateOTP() {
//     var digits = "0123456789";
//     let OTP = "";
//     for (let i = 0; i < 6; i++) {
//       OTP += digits[Math.floor(Math.random() * 10)];
//     }
//     return OTP;
//   }
//   const OTP = await generateOTP();
//   user.otp = OTP;
//   await user.save();
//   await sendEmail(user.email, OTP, "OTP");
//   res.status(200).json({
//     success: true,
//     message: "check your registered email for OTP",
//   });
//   const helper = async () => {
//     user.otp = "";
//     await user.save();
//   };
//   setTimeout(function () {
//     helper();
//   }, 300000);
// });
const Income = require("../models/incomeModel.js");
const Expense = require("../models/expensesModel.js");

exports.currentTransaction = catchAsyncErrors(async (req,res) => {
  const userId = req.user._id
  const income = await Income.find({userId}).populate("accountId").populate("categoryId")
  const expense = await Expense.find({userId}).populate("accountId").populate("categoryId")
  const data = [
    ...expense,...income
  ]
  data.sort((a, b) => {
    let dateA = a.createdAt 
    let dateB = b.createdAt 
    return new Date(dateB) - new Date(dateA); 
});

  res.status(200).json({
    success: true,
    data
  });
})

exports.updateGoles = catchAsyncErrors(async(req,res,next)=>{
const userId = req.user._id;
  const {monthly_spending,annual_spending,monthly_saving,monthly_earning} = req.body;
await User.findByIdAndUpdate(userId,{
  monthly_spending,annual_spending,monthly_saving,monthly_earning
})
res.status(201).json({
  success: true,
  message:"Your goles updated successfully"
})
});