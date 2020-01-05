const mongoose = require('mongoose');

const ResrecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  images: [
    {
      type: String
    }
  ],
  description: {
    type: String,
    default: ''
  },
  cuisine: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'restaurant'
  },
  admin_check: {
    type: String,
    default: '0'
  }
});

module.exports = Resrecipe = mongoose.model('resrecipe', ResrecipeSchema);
