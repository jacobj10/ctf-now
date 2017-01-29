var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var access = require('../access');

//Models
var Team = require('../models/team');

router.get('/', function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var query = {}
    if (queryData._id) {
        query["_id"] = queryData._id;
    }
    if (queryData.name) {
        query["name"] = {"$regex": queryData.name};
    }
    Team.find(query, function(err, about) {
        res.json({
            success: 1,
            body: about
        })
    }); 
});

router.post('/add', access.requireLogin, function(req, res) {
    if (req.body.name) {
        var team = new Team({
          name: req.body.name,
          members: req.session.user._id,
          solved: 0
        });
        team.save(function(err) {
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

router.post('/remove', access.requireLogin, function(req, res) {
    if (req.body.id) {
        Team.remove({_id: req.body.id}, function(err, about) {
            res.json({
                success: 1,
                body: about
            })
        })
    } else {
        res.json({
            success: 0,
        })
    }
});

router.post('/join', access.requireLogin, function(req, res) {
    if (req.body.id) {
        Team.update({_id: req.body.id}, function(err, team) {
            console.log(team);
        })
    }
    res.json({success: 0})
});

module.exports = router;

