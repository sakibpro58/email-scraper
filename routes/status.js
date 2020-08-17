var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    return res.status(200).json({ 
        status: 200,
        message: 'Running'
    });
});

module.exports = router;