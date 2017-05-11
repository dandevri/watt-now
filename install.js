var db = require('mongoose').connect('mongodb://localhost/watt');
var User = require('./models/user');
var Festival = require('./models/festival');
var Data = require('./models/data');

// Foodtrucks
var burgerChef = new User({
  username: 'BurgerChef'
});

var kaasTruck = new User({
  username: 'KaasTruck'
});

var asianKitchen = new User({
  username: 'AsianKitchen'
});

// Festival
var dgtl = new Festival({
  festival: 'DGTL',
  date: '11-05-2017'
});

var strafwerk = new Festival({
  festival: 'Strafwerk',
  date: '12-05-2017'
});

var pleinvrees = new Festival({
  festival: 'Pleinvrees',
  date: '13-05-2017'
});

// Data
var data = new Data({
  userId: burgerChef._id,
  festivalId: dgtl._id,
  appliances: []
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
