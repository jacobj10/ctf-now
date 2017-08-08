var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var status = 'Not logged in';
    if (req.session.user) {
        status = 'Logged in';
    }
    res.render('index');
});

module.exports = router;
