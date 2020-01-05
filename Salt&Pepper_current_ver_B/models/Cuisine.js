const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = Cuisine = mongoose.model('cuisine', CuisineSchema);
