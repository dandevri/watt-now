var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

mongoose.connect('mongodb://localhost/watt');

var app = express();

app.use(session({secret: 'ianlol'}));

var sess;

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {page: 'home'});
});

app.get('/login', function (req, res) {
  res.render('pages/login.ejs');
});

app.post('/login', function (req, res) {
  sess = req.session;

  mongoose.model('user')
  .findOne({username: req.body.username});
  sess.username = req.body.username;

  res.redirect('/festival/:id');
});

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});
