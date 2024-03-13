// routes/web/home/index.js

const express = require('express');
const router = express.Router();
const homeController = require('../../../controllers/web/home');

// Define routes for the home page
router.get('/', homeController.index);

module.exports = router;
