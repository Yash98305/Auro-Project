const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/incomeController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create').post(isAuthenticatedUser,pages.createController)
router.route('/get').get(isAuthenticatedUser,pages.getController)
router.route('/gettotalincome').get(isAuthenticatedUser,pages.getTotalIncomeOfUser)

module.exports = router