var mongoose = require('mongoose');

var DataSchema = mongoose.Schema({
  festivalId: {
    type: mongoose.Schema.Types.String,
    ref: 'festival'
  },
  userId: {
    type: mongoose.Schema.Types.String,
    ref: 'user'
  },
  appliances: []
});

var DataModel = mongoose.model('data', DataSchema);

module.exports = DataModel;
