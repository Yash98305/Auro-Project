const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('./../controllers/messageController.js')
const {isAuthenticatedUser} = require("../controllers/authMiddlewaresUser.js")

router.route('/conversation/add').post(pages.newConvertionController)
router.route('/conversation/get').post(pages.getConversationController)
router.route('/add').post(pages.newMessageController)
router.route('/get/:id').get(pages.getMessagesController)
module.exports = router