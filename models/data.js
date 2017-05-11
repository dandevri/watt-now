var mongoose = require('mongoose');

var DataSchema = mongoose.Schema({
  festivalId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'festivals'
  }],
  userId: {
    type: mongoose.Schema.Types.String,
    ref: 'users'
  },
  appliances: []
});

var Data = mongoose.model('datas', DataSchema);

module.exports = Data;
