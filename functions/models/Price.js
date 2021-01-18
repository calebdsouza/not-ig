const mongoose = require('mongoose');
const { CURRENCIES_ENUM } = require('../constants')

const PriceSchema = new mongoose.Schema({ 
  currency: {
    type: String,
    required: true,
    enum: CURRENCIES_ENUM,
  },
  amount: {
    type: mongoose.Decimal128,
    required: true,
    min: 0.00,
  },
});

module.exports = { PriceSchema };