const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  pincode: {
    type: Number,
    default: 111111
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  fav_cuisines: [
    {
      name: {
        type: String
      }
    }
  ],
  user_type: {
    type: String,
    default: 'user'
  }
});

module.exports = User = mongoose.model('user', UserSchema);
