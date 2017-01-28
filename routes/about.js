var express = require('express');
var router = express.Router();
var request = require('request');

//Models
var About = require('../models/about');

router.get('/', function(req, res) {
    About.find({}, function(err, users) {
        res.json({
            success: 1,
            body: users
        })
    }); 
});

router.post('/', function(req, res) {
    if (req.body.name && req.body.username && req.body.desc) {
        var about = new About({
          name: req.body.name,
          username: req.body.username,
          about: req.body.desc,
          image_path: 'n/a',
        });
        about.save(function(err) {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    success: 1,
                    body: "Added - " + req.body.name 
                })
            }
        });
    } else {
        res.json({
            success: 0,
            body: err
        })
    }
});
module.exports = router;
