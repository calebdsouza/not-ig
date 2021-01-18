const mongoose = require('mongoose');
const { PriceSchema } = require('./Price');
const { PERMISSIONS_ENUM } = require('../constants')

const Image = mongoose.model('Image', {
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 25,
    trim: true,
  },
  file_path: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  owner_id: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  price: {
    type: PriceSchema,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
    min: 0,
  },
  discount: {
    type: mongoose.Decimal128,
    required: true,
    min: 0.00,
  },
  public: { 
    type: Boolean,
    required: true,
  },
  time_added: {
    type: Date,
    default: Date.now
  },
  time_updated: {
    type: Date,
    default: Date.now
  }

})

module.exports = { Image };