const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', {
  uid: {
    type: String,
    required: true,
    minlegth: 6,
    trim: true,
  },
  images: {
    type: [{type: Schema.Types.ObjectId, ref: 'Store'}],
    required: false,
    default: [],
  },
  balance: {
    type: mongoose.Decimal128,
    required: true,
    min: 0.00,
    default: 0.00,
  }
});

module.exports = { User };