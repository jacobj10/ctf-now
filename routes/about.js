var express = require('express');
var router = express.Router();
var request = require('request');

//Models
var About = require('../models/about');

router.get('/', function(req, res) {
    console.log(req);
    About.find({}, function(err, users) {
        console.log(users);
        res.json({
            success: 1,
            body: users
        })
    }); 
});

router.post('/', function(req, res) {
    console.log("reqlol");
    res.json({
        sucess: 1,
        body: "aylmao"
    })
});
module.exports = router;
