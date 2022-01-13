const express = require('express')
const {loginController,isTokenValidController} = require('../controllers')

const router = express.Router();

router.post("/", loginController);

router.get("/check", isTokenValidController);

module.exports = router;