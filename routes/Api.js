var express = require('express');
var router = express.Router();

var ApiController = require('../controllers/ApiController')

router.post('/scrap', ApiController.scrap);

module.exports = router;