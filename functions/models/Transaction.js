const mongoose = require('mongoose');
const { PriceSchema } = require('./Price');

const Transaction = mongoose.model('Image', {
  owner_id: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  img_id: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  price: { 
    type: PriceSchema,
    required: true,
  },
  amount: { 
    type: Number,
    required: true,
    min: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = { Transaction };