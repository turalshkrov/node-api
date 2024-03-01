const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  }
}, { collection: 'category', versionKey: false });

Category.pre('save', function (next) {
  this.categoryName = this.categoryName.trim();
  this.description = this.description.trim();
  next();
});

Category.pre('findOneAndUpdate', function (next) {
  this._update.categoryName = this._update.categoryName.trim();
  this._update.description = this._update.description.trim();
  next();
});

module.exports = mongoose.model('category', Category);