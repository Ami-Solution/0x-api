const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenPairsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  tokenA: { type: Schema.Types.ObjectId, ref: 'Token' },
  tokenB: { type: Schema.Types.ObjectId, ref: 'Token' }
});

const TokenSchema = new Schema({
  _id: Schema.Types.ObjectId,
    address: String,
    minAmount: String,
    maxAmount: String,
    precision: Number
});


export const TokenPairs = mongoose.model('TokenPairs', TokenPairsSchema);
export const Token = mongoose.model('Token', TokenSchema)
