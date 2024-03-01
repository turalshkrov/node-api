const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
}, { collection: 'users', versionKey: false });

User.pre('save', function (next) {
  const name = this.name.toLowerCase().trim().split(' ');
  this.username = this.username.toLowerCase().trim();
  this.name = '';
  name.forEach(elm => {
    this.name += elm[0].toUpperCase() + elm.slice(1) + ' ';
  });
  this.name = this.name.trim();
  next();
})

User.pre('findOneAndUpdate', function (next) {
  const name = this._update.name.toLowerCase().trim().split(' ');
  this._update.username = this._update.username.toLowerCase().trim();
  this._update.name = '';
  name.forEach(elm => {
    this._update.name += elm[0].toUpperCase() + elm.slice(1) + ' ';
  });
  this._update.name = this._update.name.trim();
  next();
});

module.exports = mongoose.model('user', User);