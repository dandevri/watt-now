var express = require('express');

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

app.listen(port, host, function () {
  console.log('Server running', host, ':', port);
});

function energyLevel(req, res) {
  var level = req.query.level;
  console.log('Received energy ' + level + ' request');
  switch (level) {
    case '10':
      res.send('10 procent');
      break;
    case '20':
      res.send('20 procent');
      break;
    case '30':
      res.send('30 procent');
      break;
    case '40':
      res.send('40 procent');
      break;
    case '50':
      res.send('50 procent');
      break;
    case '60':
      res.send('60 procent');
      break;
    case '70':
      res.send('70 procent');
      break;
    case '80':
      res.send('80 procent');
      break;
    case '90':
      res.send('90 procent');
      break;
    case '100':
      res.send('100 procent');
      break;
    default:
      res.send('Procent undefined');
  }
}
