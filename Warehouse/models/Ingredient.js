const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
   minQuantity: {
    type: String,
    default: ''
  },
  availableQuantity:{
      type:Number,
      default:1
  },
  admin_check: {
    type: String,
    default: '0'
  }
});

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema);
