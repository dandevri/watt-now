var db = require('mongoose').connect('mongodb://localhost/watt');
var User = require('./models/user');
var Festival = require('./models/festival');
var data = require('./models/data');

Promise.all([
  User.remove({}),
  Festival.remove({}),
  data.remove({})
])
.then(() => db.connection.close());
