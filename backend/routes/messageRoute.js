const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/messageController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/:itemId/message').post(isAuthenticatedUser, pages.sendMessage)
router.route('/:itemId/messages').get(isAuthenticatedUser, pages.getChatHistory)
module.exports = router