var http = require('http');
var express = require('express');
var socket = require('socket.io');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

var app = express();

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/dashboard/:user/:festival', function (req, res) {
  res.render('pages/dashboard', {data: [50, 250], festival: 'Rollende keuken', totalUsage: '34%', urlDash: req.url, urlAppl: `/appliances/${req.params.user}/${req.params.festival}`, appliances: [{name: 'Koffie'}, {name: 'Frituur'}]});
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.get('/', function (req, res) {
  res.render('pages/home', {user: 'foodChef', festivals: [{name: 'rollende keukens', date: '10 mei', image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'}]});
});

app.get('/api/energy/', energyLevel);

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.get('/appliances/:user/:festival', function (req, res) {
  res.render('pages/appliances', {urlAppl: req.url, urlDash: `/dashboard/${req.params.user}/${req.params.festival}`});
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
