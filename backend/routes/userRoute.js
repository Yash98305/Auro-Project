const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('./../controllers/userController.js')
const {isAuthenticatedUser} = require("../controllers/authMiddlewaresUser.js")

router.route('/login').post(pages.userLoginController)
router.route('/register').post(pages.userRegisterController)
router.route('/updateprofile/:id').put(formidable(),pages.updateProfile)
router.route('/getallusers').post(pages.getAllUserController)
router.route('/photo/:pid').get(pages.getAllUsersPhotoController)
router.route('/myprofile').get(isAuthenticatedUser,pages.getUserDetailsController)
router.route('/:id/reputation').get(pages.getUserReputation);
module.exports = router