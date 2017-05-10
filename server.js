var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

mongoose.connect('mongodb://localhost/watt');

var app = express();

app.use(session({
  secret: 'lol',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.get('/festival', function (req, res) {
  res.render('pages/home', {user: 'foodChef', festivals: [{name: 'rollende keukens', date: '10 mei', image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'}]});
});

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.post('/login', function (req, res) {
  mongoose.model('user')
    .findOne({username: req.body.username})
    .select('username');

    console.log(findOne);

    if (findOne) {
      req.session.username = username;
      return res.redirect('/festival');
    } else {
      return res.redirect('/login');
    }
});

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});
