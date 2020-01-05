const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique:true
  },
  image: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 1
  },
  type: [
    {
      type: String,
      default: ''
    }
  ],
  minQuantity: {
    type: String,
    default: ''
  },
  availableQuantity:[{
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'warehouse'
    },
     quantity:{
         type:Number,
         default:1
     }
  }],
  totalQuantity:{
      type:Number,
      default:1
  },
  admin_check: {
    type: String,
    default: '0'
  }
});

module.exports = Ingredient = mongoose.model('ingredient', IngredientSchema);
