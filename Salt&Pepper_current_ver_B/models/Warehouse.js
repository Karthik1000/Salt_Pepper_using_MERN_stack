const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
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
    type: String
  },
  pincode: {
    type: String
  },
  city: {
    type: String
  },
  token: {
    type: String,
    required: true
  }
});

module.exports = Warehouse = mongoose.model('warehouse', WarehouseSchema);
