import mongoose = require('mongoose');
import ObjectId = mongoose.Schema.Types.ObjectId;

export interface ISignedOrders {
  orders?: Object[]
}
