var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true}
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
