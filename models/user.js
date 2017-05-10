var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, required: true}
});

var UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
