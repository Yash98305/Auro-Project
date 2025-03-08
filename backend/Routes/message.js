const express = require('express');
const pages = require('../Controllers/message');
const router = express.Router();
const {isAuthenticatedUser} = require('../Middlewares/authMiddlewares.js')

router.route('/').post( isAuthenticatedUser, sendMessage);
router.route('/:id').get(isAuthenticatedUser, getMessages);

module.exports = router;