var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (process.env.NODE_ENV === 'production') {
        const path = require('path');
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    } else {
        res.render('home', { title: 'Scarp Me' });
    }
});

module.exports = router;