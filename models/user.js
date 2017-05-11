var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: {type: String, unique: true, required: true},
  festival: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'festivals'
  }]
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
