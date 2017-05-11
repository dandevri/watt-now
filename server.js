var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');

var models = path.join(__dirname, '/models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(path.join(models, file)));

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

mongoose.connect('mongodb://localhost/watt');

var app = express();

app.use(morgan('dev'));
app.use(session({secret:'testing', resave:false, saveUninitialized:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  if(!req.session.user) {
    return res.redirect('/login');
  }

  var User = mongoose.model('users');

  // 😘 Rijk
  var collection = User.find();
  collection.where({username: req.session.user.username});
  collection.populate('festival');
  collection.exec(function(err, records) {
    if(err) {
      return res.send(err);
    }
    console.log(records);
    res.render('pages/home', {user: records[0], festivals: records[0].festival});
  });
});

app.get('/dashboard/:user/:festival', function (req, res) {
    console.log(req.params);
    // 😘 Rijk
    var Festival = mongoose.model('festivals');
    var collection = Festival.find();
    collection.where({_id: req.params.festival});
    collection.exec(function (error, records) {
      if(error) {
        return res.send(error);
      }
      res.render('pages/dashboard', {data: [50, 250], festival: records[0].festival, totalUsage: '34%', urlDash: req.url, urlAppl: `/appliances/${req.params.user}/${req.params.festival}`, appliances: [{name: 'Koffie'}, {name: 'Frituur'}]});
    });
});

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.post('/register', function (req, res) {
  var username = req.body.username;

  var User = mongoose.model('users');

  var newUser = new User();
  newUser.username = username;
  newUser.save(function(err, savedUser) {
    if(err) {
      console.log(err);
      return res.send('error');
    }
    return res.redirect('/login');
  });
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.post('/login', function (req, res) {
  var username = req.body.username;

  var User = mongoose.model('users');

  User.findOne({username: username}, function (err, user) {
    if(err) {
      console.log(err);
      return res.send('error');
    }
    if(!user) {
      return res.send('no user found');
    }
    req.session.user = user;
    return res.redirect('/');
  });
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  return res.redirect('/login');
});

app.get('/festival', function (req, res) {
  if(!req.session.user) {
    return res.status(401).send();
  }
  return res.render('pages/home', {user: 'foodChef', festivals: [{name: 'rollende keukens', date: '10 mei', image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'}]});
});

app.get('/appliances/:user/:festival', function (req, res) {
  res.render('pages/appliances', {urlAppl: req.url, urlDash: `/dashboard/${req.params.user}/${req.params.festival}`});
});

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});
