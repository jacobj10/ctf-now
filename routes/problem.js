var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');
var access = require('../access');

//Models
var Problem = require('../models/problem');

router.get('/', access.requireLogin, function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var query = {}
    if (queryData.category) {
        query["category"] = queryData.category;
    }
    Problem.find(query, function(err, problem) {
        res.json({
            success: 1,
            body: problem
        })
    }); 
});

router.get('/check', access.requireLogin, function(req, res) {
    var queryData = url.parse(req.url, true).query;
    if (queryData.id && queryData.answer) {
        Problem.findOne({_id: queryData.id }, function(err, problem) {
            if (!problem) {
                res.json({
                    success: 0
                })
            } else if (problem.flag == queryData.answer) {
                res.json({
                    success: 1
                })
            } else {
                res.json({
                    success: 0
                })
            }
        });
    } else {
        res.json({
            success: 0
        })
    }
});

router.post('/add', access.requireLogin, function(req, res) {
    if (req.body.title && req.body.content && req.body.category && req.body.flag) {
        var filepaths = '';
        if (req.body.filepaths) {
            filepaths = req.body.filepaths;
        }
        var problem = new Problem({
          title: req.body.title,
          content: req.body.content,
          filepaths: req.body.filepaths,
          author: req.session.user._id,
          solves: 0,
          category: req.body.category,
          flag: req.body.flag
        });
        problem.save(function(err) {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    success: 1,
                    body: "Added - " + req.body.title 
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
        Problem.remove({_id: req.body.id}, function(err, problem) {
            res.json({
                success: 1,
                body: problem
            })
        })
    } else {
        res.json({
            success: 0,
        })
    }
});

module.exports = router;

