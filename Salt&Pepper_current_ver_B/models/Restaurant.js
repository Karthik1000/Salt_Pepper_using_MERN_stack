const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true,
    default: ''
  },
  city: {
    type: String,
    required: true,
    default: ''
  },
  pincode: {
    type: Number,
    required: true,
    default: 111111
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
});
module.exports = Restaurant = mongoose.model('restaurant', RestaurantSchema);
