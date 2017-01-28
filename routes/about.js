var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');

//Models
var About = require('../models/about');

router.get('/', function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var query = {}
    if (queryData._id) {
        query["_id"] = queryData._id;
    }
    if (queryData.name) {
        query["name"] = {"$regex": queryData.name};
    }
    if (queryData.username) {
        query["username"] = {"$regex": queryData.username};
    }
    About.find(query, function(err, users) {
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
        })
    }
});
module.exports = router;
