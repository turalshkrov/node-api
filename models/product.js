const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },

}, { collection: 'products', versionKey: false });

Product.pre('save', function(next) {
  this.title = this.title.trim();
  this.description = this.description.trim();
  this.categoryId = this.categoryId.trim();
  next();
});

Product.pre('findOneAndUpdate', function(next) {
  this._update.title = this._update.title.trim();
  this._update.description = this._update.description.trim();
  this._update.categoryId = this._update.categoryId.trim();
  next();
});

module.exports = mongoose.model('product', Product);