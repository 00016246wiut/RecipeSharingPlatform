// routes/web/index.js

const express = require('express');
const homeRouter = require('./home');

const router = express.Router();

// Registering child routers
router.use('/', homeRouter);

module.exports = router;
