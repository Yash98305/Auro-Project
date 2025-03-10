const Message = require("./../models/messageModel.js");
const User = require("./../models/userModel.js");
const Conversation = require("./../models/conversationModel.js");
const catchAsyncErrors = require("./../middlewares/catchAsyncError.js");

exports.newConvertionController = catchAsyncErrors(async(req,res,next)=>{
    const {senderId , receiverId} = req.body;
  const exist = await Conversation.findOne({
    members:{
      $all : [receiverId,senderId]
    }
  })
  if(exist){
    return res.status(200).json({
      message : "conversation already exists"
    })
  }
  
  const newConvertion = new Conversation({
    members : [senderId , receiverId]
  })
  await newConvertion.save();
  return res.status(200).json({
    message : "conversation saved successfully"
  })
  })
  
  exports.getConversationController = catchAsyncErrors(async(req,res,next)=>{
    const {senderId , receiverId} = req.body;
    let conversation = await Conversation.findOne({
      members : {
        $all : [receiverId,senderId]    }
      })
    return res.status(200).json(conversation)
  })
  
  exports.newMessageController = catchAsyncErrors(async(req,res,next)=>{
  const newMessage = new Message(req.body)
  await newMessage.save()
  await Conversation.findByIdAndUpdate(req.body.conversationId, {message:req.body.text})
  return res.status(200).json({
    message : "message has sent"
  })
  })
  
  exports.getMessagesController = catchAsyncErrors(async(req,res,next)=>{
    const message = await Message.find({conversationId : req.params.id})
    return res.status(200).json(message)
  })
 