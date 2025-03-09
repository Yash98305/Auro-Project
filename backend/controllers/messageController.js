const Message = require("../models/messageModel.js");
const User = require("../models/userModel.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");

exports.sendMessage = catchAsyncErrors(async (req, res) => {
    const { message } = req.body;
    const { itemId } = req.params;
    const senderId = req.user._id; // Assume user is authenticated

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    const newMessage = new Message({
        sender: senderId,
        receiver: item.seller,
        item: itemId,
        message,
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
});

// Get chat history with the seller
exports.getChatHistory = catchAsyncErrors(async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({ 
        item: itemId, 
        $or: [{ sender: userId }, { receiver: userId }] 
    })
    .populate("sender", "name email")
    .populate("receiver", "name email");

    res.status(200).json({ success: true, messages });
});


exports.markMessagesAsRead =catchAsyncErrors( async (req, res) => {
    const { senderId } = req.body;
    const receiverId = req.user.id;

    await Message.updateMany(
      { sender: senderId, receiver: receiverId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "Messages marked as read" });
  
});
