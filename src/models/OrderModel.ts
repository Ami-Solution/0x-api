import { Document, model, Model, Schema } from  'mongoose';
import { IOrderDocument } from '../interfaces/order';

interface IOrder extends IOrderDocument { };

interface IOrderModel extends Model<IOrder> { };

const OrderSchema = new Schema({
  exchangeContractAddress: {
    type: String,
    required: true
  },
  maker: {
    type: String,
    required: true
  },
  taker: {
    type: String,
    required: true
  },
  makerTokenAddress: {
    type: String,
    required: true
  },
  takerTokenAddress: {
    type: String,
    required: true
  },
  feeRecipient: {
    type: String,
    required: true
  },
  makerTokenAmount: {
    type: String,
    required: true
  },
  takerTokenAmount: {
    type: String,
    required: true
  },
  makerFee: {
    type: String,
    required: true
  },
  takerFee: {
    type: String,
    required: true
  },
  expirationUnixTimestampSec: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  ecSignature: {
    v: {type: Number, required: true},
    r: {type: String, required: true},
    s: {type: String, required: true},
  }
});

export const Order: IOrderModel = model<IOrder, IOrderModel>('Order', OrderSchema);
