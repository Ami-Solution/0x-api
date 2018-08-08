import mongoose = require('mongoose');
import ObjectId = mongoose.Schema.Types.ObjectId;

export interface IOrderBook {
  bids?: Object,
  asks?: Object,
}
