var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res) {
	res.json({
		success: 1,
		data: "ABOUT"
	})
});
module.exports = router;
