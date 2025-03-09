const express = require('express')
const router = express.Router()
const pages = require('../controllers/categoriesController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create').post(isAuthenticatedUser,pages.createController)
router.route('/getcategory').get(isAuthenticatedUser,pages.getCategory)
router.route('/getincomecategory').get(isAuthenticatedUser,pages.getIncomeCategory)
router.route('/getexpensecategory').get(isAuthenticatedUser,pages.getExpenseCategory)
router.route('/update/:id').put(isAuthenticatedUser,pages.updateCategory)
router.route('/delete/:id').delete(isAuthenticatedUser,pages.deleteCategory)
module.exports = router