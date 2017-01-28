var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var request = require('request');

// Models
var User = require('../models/user');

router.get('/', function(req, res) {
    if (req.session.user) {
        res.json({
            user: req.session.user,
            success: 1
        })
    } else {
        res.json({
            success: 0,
            message: "User not logged in"
        })
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(err){
        res.json({
            success: 1
        });
    });
});

router.route('/register').post(function(req, res) {
    if (req.body.username && req.body.password && req.body.firstname && req.body.lastname) {
        var hash = bcrypt.hashSync(req.body.password, salt);
        var user = new User({
            username: req.body.username,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });
        user.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    success: 1,
                    body: "New user created"
                });
            }
        });
    } else {
        res.json({
            success: 0,
            body: "New user creation failed"
        });
    }
});

router.route('/login').post(function(req, res) {
    if (req.body.username && req.body.password) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    req.session.regenerate(function() {
                        req.session.user = {
                            username: user.username,
                            _id: user._id,
                        };
                        res.json({
                            success: 1,
                        });
                    });
                } else {
                    res.json({
                        success: 0,
                        message: "Username or password incorrect"
                    });
                }
            } else {
                res.json({
                    success: 0,
                    message: "Username or password incorrect"
                });
            }

        });
    } else {
        res.json({
            success: 0,
            message: "Username or password not supplied"
        });
    }
});

module.exports = router;
