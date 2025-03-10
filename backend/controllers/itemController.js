const fs = require("fs");
const Item = require("./../models/itemModel.js");
const User = require("./../models/userModel.js");
const catchAsyncErrors = require("./../middlewares/catchAsyncError.js");

exports.createItem = catchAsyncErrors(async (req, res) => {
    const { title, description, category, price, condition, location, seller } = req.fields;
    const images = req.files?.images; // Check if images exist

    if (!title || !description || !category || !price || !condition || !location || !seller) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let imageBuffers = [];

    if (images) {
        try {
            if (Array.isArray(images)) {
                // Handling multiple images
                imageBuffers = images.map((img) => ({
                    data: fs.readFileSync(img.path),
                    contentType: img.type,
                }));
            } else {
                // Handling a single image
                imageBuffers = [{
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                }];
            }
        } catch (err) {
            return res.status(500).json({ error: "Error processing image files", details: err.message });
        }
    }

    const newItem = new Item({
        title,
        description,
        category,
        price,
        condition,
        location,
        seller,
        images: imageBuffers,
    });

    await newItem.save();
    res.status(201).json({ message: "Item created successfully!", newItem });
});

exports.updateItem = catchAsyncErrors(async (req, res) => {
    const { title, description, category, price, condition, location } = req.fields;
    const { images } = req.files || {};
    let imageBuffers = [];

    if (images) {
        try {
            if (Array.isArray(images)) {
                imageBuffers = images.map((img) => ({
                    data: fs.readFileSync(img.path),
                    contentType: img.type,
                }));
            } else {
                imageBuffers = [{
                    data: fs.readFileSync(images.path),
                    contentType: images.type,
                }];
            }
        } catch (err) {
            return res.status(500).json({ error: "Error processing image files" });
        }
    }

    const updatedData = { title, description, category, price, condition, location };
    if (imageBuffers.length > 0) {
        updatedData.images = imageBuffers;
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item updated successfully!", updatedItem });
});

// Fetch all items (with optional category filter)
exports.getAllItems = catchAsyncErrors(async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await Item.find(filter).populate("seller", "name email");

    res.status(200).json({ success: true, items });
});

exports.getItemById = catchAsyncErrors(async (req, res) => {
    const item = await Item.findById(req.params.id)
        .populate("seller", "name email") // Fetch seller details
        .populate("reviews.user", "name email"); // Fetch user details for each review

    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ 
        success: true, 
        item,
        reviews: item.reviews, // Send reviews as well
    });
});




// Delete item by ID
exports.deleteItem = catchAsyncErrors(async (req, res) => {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item deleted successfully" });
});



exports.getPhotoController = catchAsyncErrors(async (req, res,next) => {
  const item = await Item.findById(req.params.id).select("images");
    if (item.images[0].data) {
      res.set("Content-type", item.images[0].contentType);
      return res.status(200).send(item.images[0].data);
    }
  
})

exports.addReview = catchAsyncErrors(async (req, res) => {
    const { rating, comment } = req.body;
    const { itemId } = req.params;
    const userId = req.user._id; // Assume user is authenticated

    if (!rating || !comment) {
        return res.status(400).json({ error: "Rating and comment are required" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }

    // Check if user already reviewed
    const existingReview = item.reviews.find((rev) => rev.user.toString() === userId.toString());
    if (existingReview) {
        return res.status(400).json({ error: "You have already reviewed this item" });
    }

    // Add new review
    item.reviews.push({ user: userId, rating, comment });
    await item.save();

    res.status(201).json({ message: "Review added successfully", reviews: item.reviews });
});

const Review = require("../models/reviewModel.js");

exports.createReview = catchAsyncErrors(async (req, res) => {
    const { reviewedUser, comment, rating, itemId } = req.body;
    const reviewer = req.user.id; // Assuming you use authentication middleware

    if (!reviewedUser || !comment || !rating || !itemId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = new Review({
      reviewer,
      reviewedUser,
      comment,
      rating,
      itemId,
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully", review: newReview });
 
});

exports.getUserReviews = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    console.log(1,req.params)
    const reviews = await Review.find({itemId:id}).populate("reviewer")
console.log(reviews)
    res.status(200).json(reviews);
})

exports.deleteReview = catchAsyncErrors(async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.reviewer.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own reviews" });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
})
