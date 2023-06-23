const mongoose = require('mongoose');

const costSchema = new mongoose.Schema({
  user_id: String,
  year: Number,
  month: Number,
  day: Number,
  id: Number,
  description: String,
  category: String,
  sum: Number
});

const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;
