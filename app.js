var express = require('express');
var session = require('express-session');
 var bodyParser = require('body-parser');
// var morgan = require('morgan');

var app = express();
var port = 8081

// var mongoose = require('mongoose');
// var mongo_address = "127.0.0.1";
// mongoose.connect(mongo_address);

// Configure middleware
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'm1qewbBd2E'
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/ctf-app/index.html');
});
app.use('/', express.static(__dirname + '/ctf-app/index.html'));

var about = require('./routes/about');
app.use('/api/about', about);

app.listen(port);
console.log('API running on port ' + port);
