import mongoose = require('mongoose');
import { IFees } from '../interfaces/fees';
import ObjectId =  mongoose.Types.ObjectId;

interface IFeesModel extends IFees, mongoose.Document { }

const FeesSchema = new mongoose.Schema({
  orders: [{ type: ObjectId, ref: 'Order' }],
});

export const Fees = mongoose.model<IFeesModel>('FeesOrders', FeesSchema);
