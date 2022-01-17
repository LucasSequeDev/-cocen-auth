const express = require('express')
const router = express.Router();
const { getProductsController } = require('../controllers')

// Desde el package
const authMiddleware = require('../../../package/auth-middleware/index')

router.get("/", authMiddleware ,getProductsController);

module.exports = router;