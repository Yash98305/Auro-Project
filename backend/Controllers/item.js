const catchAsyncError = require('../Middlewares/catchAsyncError');
const Item = require('../Models/itemModel');

exports.create =catchAsyncError( async(req, res) => {
  const { name, category, description, price } = req.body;
  const newItem = new Item({
    name,
    category,
    description,
    price,
    userId: req.user._id, 
  });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  
});

exports.getItems =catchAsyncError( async(req, res) => {
 
    const items = await Item.find().populate('userId', 'name email'); // Populate user details
    res.json(items);
 
});


exports.getSingleItem = catchAsyncError( async(req, res) => {
  const { id } = req.params;

    const item = await Item.findById(id).populate('userId', 'name email');
    if (!item) {
        return next(new ErrorHandler("Item not found.", 404));
    }
    res.json(item);
  
});


exports.update = catchAsyncError( async(req, res) => {
  const { id } = req.params;
  const { name, category, description, price, status } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, category, description, price, status },
      { new: true }
    );

    if (!updatedItem) {
        return next(new ErrorHandler("Item not found.", 404));
    }

    res.json(updatedItem);
  
});

exports.delete = catchAsyncError( async(req, res) => {
  const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
        return next(new ErrorHandler("Item not found.", 404));
    }
    res.json({ message: 'Item deleted successfully' });
  
});