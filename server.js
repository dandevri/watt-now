var http = require('http');
var express = require('express');
var socket = require('socket.io');
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

app.get('/api/energy/', energyLevel);

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.get('/appliances/:user/:festival', function (req, res) {
  res.render('pages/appliances', {urlAppl: req.url, urlDash: `/dashboard/${req.params.user}/${req.params.festival}`});
});

app.post('/appliances/:user/:festival', function (req, res) {
  var Data = mongoose.model('datas');

  Data.findByIdAndUpdate(
    req.session.user._id,
    {$push: {appliances: {quantity: req.body.quantity, watt: req.body.watt, ampere: req.body.ampere, voltage: req.body.voltage, appliance: req.body.appliance}}},
    {safe: true, upsert: true, new: true},
    function(err) {
      console.log(err);
    }
  );

  res.redirect(req.url);

  // var userId = req.params.user;
  // var fesitvalId = req.params.festival;
  //
  // Data.findOne({userId: user, fesitvalId: festival}, function(err, user) {
  //   if(err) {
  //     console.log(err);
  //     return res.send('error');
  //   }
  // });


  // In progress: if there are no appliances in db => add array, else => update appliances array with push
  // var Data = mongoose.model('datas');
  //
  // Data.findOne({appliances: appliance}, function (err, user) {
  //   if(err) {
  //     console.log(err);
  //     return res.send('error');
  //   }
  //   if(!appliances) {
  //     var userId = req.session.user;
  //     var appliance = req.body.appliance;
  //     var voltage = req.body.voltage;
  //     var ampere = req.body.ampere;
  //     var watt = req.body.watt;
  //     var quantity = req.body.quantity;
  //
  //     var newData = new Data();
  //
  //     newData.userId = userId;
  //     newData.appliances.appliance = appliance;
  //     newData.appliances.voltage = voltage;
  //     newData.appliances.ampere = ampere;
  //     newData.appliances.watt = watt;
  //     newData.appliances.quantity = quantity;
  //     newData.save();
  //   }
  //   Data.findByIdAndUpdate(
  //     req.session.user._id,
  //     {$push: {"appliances": {appliance: req.body.appliance, voltage: req.body.voltage, ampere: req.body.ampere, watt: req.body.watt, quantity: req.body.quantity}}},
  //     {safe: true, upsert: true, new : true},
  //     function(err, model) {
  //       console.log(err);
  //     });
  //   res.redirect('/appliances/:user/:festival');
  // });
});

app.get('/subscription', function (req, res) {
  res.render('pages/subscription', {label: 'label a', subscription: {cost: '€439,-', size: '2300Kwh'}});
});

var server = http.Server(app);
var io = socket(server);

server.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});

function energyLevel(req, res) {
  var level = String(Math.round(req.query.level));
  io.emit('value', level);
  res.end();
}
