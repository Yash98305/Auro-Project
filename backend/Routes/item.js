const express = require('express');
const router = express.Router();
const pages = require('../Controllers/item.js');
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')
const formidable = require("express-formidable");

router.route("/").post(isAuthenticatedUser,pages.create);
router.route("/").get(pages.getItems);
router.route("/:id").get( pages.getSingleItem);
router.route('/:id').put(isAuthenticatedUser,pages.update)
router.route('/:id').delete(isAuthenticatedUser,pages.delete)

module.exports = router;