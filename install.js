var db = require('mongoose').connect('mongodb://localhost/watt');
var User = require('./models/user');
var Festival = require('./models/festival');
var Data = require('./models/data');

// Festival
var dgtl = new Festival({
  festival: 'DGTL',
  date: '11-05-2017',
  image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'
});

var strafwerk = new Festival({
  festival: 'Strafwerk',
  date: '12-05-2017',
  image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'
});

var pleinvrees = new Festival({
  festival: 'Pleinvrees',
  date: '13-05-2017',
  image: 'http://www.recensiequeens.nl/wp-content/uploads/2014/05/rollende-keukens.jpg'
});

// Foodtrucks
var burgerChef = new User({
  username: 'BurgerChef',
  festival: [dgtl._id, strafwerk._id, pleinvrees._id]
});

var kaasTruck = new User({
  username: 'KaasTruck',
  festival: []
});

var asianKitchen = new User({
  username: 'AsianKitchen',
  festival: []
});

// Data
var data = new Data({
  userId: burgerChef._id,
  festivalId: [dgtl._id, pleinvrees._id],
  appliances: [{
    appName: 'frituur',
    voltage: '100',
    ampere: '2',
    watt: '150',
    quantity: '2'
  },
  {
    appName: 'koffiezetapparaat',
    voltage: '200',
    ampere: '5',
    watt: '300',
    quantity: '1'
  }]
});

Promise.all([
  burgerChef.save(),
  kaasTruck.save(),
  asianKitchen.save(),

  dgtl.save(),
  strafwerk.save(),
  pleinvrees.save(),

  data.save()
])
.then(() => db.connection.close())
.catch(() => {
  console.log('Records bestaan al');
});
