var mongoose = require('mongoose');

var DataSchema = mongoose.Schema({
  festivalId: {
    type: mongoose.Schema.Types.String,
    ref: 'festivals'
  },
  userId: {
    type: mongoose.Schema.Types.String,
    ref: 'users'
  },
  appliances: [{
    appliance: String,
    voltage: Number,
    ampere: Number,
    watt: Number,
    quantity: Number
  }]
});

var Data = mongoose.model('datas', DataSchema);

module.exports = Data;
