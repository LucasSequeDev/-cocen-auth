const express = require('express')
const {postController} = require('../controllers')

const router = express.Router();

router.post("/", postController);

module.exports = router;