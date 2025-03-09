const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/accountController.js')
// const upload = require("../utils/upload.js")
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create').get(isAuthenticatedUser,pages.createController)
router.route('/get').get(isAuthenticatedUser,pages.getController)
module.exports = router