const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  video: {
    type: String
  },
  description: {
    type: String,
    default: ''
  },
  available_quantity: {
    type: Number,
    default: 1
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ingredient'
    }
  ],
  ingredient: [
    {
      type: String
    }
  ],
  quantity: [
    {
      type: String
    }
  ],
  cuisine: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  report: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      }
    }
  ],
  admin_check: {
    type: String,
    default: '0'
  },
  diet: {
    type: String,
    default: 'Veg'
  },
  calories: {
    type: Number,
    default: 100
  }
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
