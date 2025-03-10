const express = require("express");
const pages = require("./../controllers/itemController.js");
const formidable = require("express-formidable");
const { isAuthenticatedUser } = require("../controllers/authMiddlewaresUser.js");
const router = express.Router();

router.route("/create").post(formidable(), pages.createItem); 
router.route("/:itemId/review").post( isAuthenticatedUser, pages.addReview); 
router.route("/").get( pages.getAllItems); 
router.route("/:id").get( pages.getItemById); 
router.route("/image/:id").get( pages.getPhotoController); 
router.route("/:id").put( pages.updateItem); 
router.route("/:id").delete( pages.deleteItem); 

router.route("/review/create").post(isAuthenticatedUser, pages.createReview); 
router.route("/review/:id").get( pages.getUserReviews); 
router.route("/review/:id").delete( pages.deleteReview); 

module.exports = router