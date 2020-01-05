const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  website: {
    type: String
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipe'
    }
  ],
  address: {
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
    }
  },
  skills: [
    {
      type: String
    }
  ],
  dob: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  following: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  followers: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }
  ],
  orders:[{
      recipe:{
          type:String,
      },
      total:{
          type:Number,
          default:1
      }
}],
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipe'
    }
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recipe'
    }
  ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
