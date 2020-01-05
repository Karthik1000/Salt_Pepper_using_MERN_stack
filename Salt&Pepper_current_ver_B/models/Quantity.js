const mongoose = require('mongoose');

const QuantitySchema = new mongoose.Schema({
  recipe_name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe'
  },
  recipe_quantity: {
    type: Number,
    default: 1
  }
});

module.exports = Quantity = mongoose.model('quantity', QuantitySchema);
