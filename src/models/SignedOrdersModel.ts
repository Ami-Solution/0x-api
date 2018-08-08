import mongoose = require('mongoose');
import { ISignedOrders } from '../interfaces/signedorders';
import ObjectId =  mongoose.Types.ObjectId;

interface ISignedOrdersModel extends ISignedOrders, mongoose.Document { }

const SignedOrdersSchema = new mongoose.Schema({
  orders: [{ type: ObjectId, ref: 'Order' }],
});

export const SignedOrders = mongoose.model<ISignedOrdersModel>('SignedOrders', SignedOrdersSchema);
