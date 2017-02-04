var express = require('express');
var session = require('express-session');
 var bodyParser = require('body-parser');
// var morgan = require('morgan');

var app = express();
var port = 8081

var mongoose = require('mongoose');
var mongo_address = "127.0.0.1";
mongoose.connect(mongo_address);

// Configure middleware
//app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'm1qewbBd2E'
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/stylesheets', express.static(__dirname + '/stylesheets'));

var about = require('./routes/about');
app.use('/api/about', about);

var user = require('./routes/user');
app.use('/api/user', user);

var problem = require('./routes/problem');
app.use('/api/problem', problem);

var team = require('./routes/team');
app.use('/api/team', team);

var index = require('./routes/index');
app.use('/', index);

app.listen(port);
console.log('API running on port ' + port);
