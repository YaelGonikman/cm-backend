const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  first_name: String,
  last_name: String,
  birthday: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
