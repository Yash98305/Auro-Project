const catchAsyncError = require('../Middlewares/catchAsyncError');
const Message = require('../Models/messageModel');

exports.sendMessage =catchAsyncError( async(req, res) => {
  const { receiverId, content } = req.body;
  const message = new Message({
    senderId: req.user._id,
    receiverId,
    content,
  });
  await message.save();
  res.status(201).json(message);
});

exports.getMessages =catchAsyncError( async(req, res) => {
  const { id } = req.params;
  const messages = await Message.find({
    $or: [
      { senderId: req.user._id, receiverId: id },
      { senderId: id, receiverId: req.user._id },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});