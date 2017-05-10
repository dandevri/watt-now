var express = require('express');

var port = process.env.PORT || '3000';
var host = process.env.HOST || '0.0.0.0';

var app = express();

app.use(express.static('src'))
  .set('views', 'views')
  .set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {page: 'home'});
});

app.get('/login', function (req, res) {
  res.render('pages/login.ejs');
});

app.get('/register', function (req, res) {
  res.render('pages/register.ejs');
});

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});
