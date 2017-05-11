var mongoose = require('mongoose');

var FestivalSchema = mongoose.Schema({
  festival: {type: String, required: true},
  date: {type: String, required: true}
});

var FestivalModel = mongoose.model('festival', FestivalSchema);

module.exports = FestivalModel;
