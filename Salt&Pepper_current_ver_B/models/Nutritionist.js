const mongoose = require('mongoose');

const NutritionistSchema = new mongoose.Schema({
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
  token: {
    type: String,
    required: true
  }
});
module.exports = Nutritionist = mongoose.model(
  'nutritionist',
  NutritionistSchema
);
