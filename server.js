var express = require('express');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

var app = express();

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/dashboard/:user/:festival', function (req, res) {
  res.render('pages/dashboard', {data: [50, 250], festival: 'Rollende keuken', totalUsage: '34%', url: req.url, appliances: [{name: 'Koffie'}, {name: 'Frituur'}]});
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});

app.get('/', function (req, res) {
  res.render('pages/home', {user: 'foodChef', festivals: [{name: 'rollende keukens', date: '10 mei', image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'}]});
});

app.get('/register', function (req, res) {
  res.render('pages/register');
});

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});
