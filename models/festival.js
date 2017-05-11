var mongoose = require('mongoose');

var FestivalSchema = mongoose.Schema({
  festival: {type: String, required: true},
  date: {type: String, required: true},
  image: String
});

var Festival = mongoose.model('festivals', FestivalSchema);

module.exports = Festival;
