import mongoose = require('mongoose');
import { IOrderBook } from '../interfaces/orderbook';
import ObjectId =  mongoose.Types.ObjectId;

interface IOrderBookModel extends IOrderBook, mongoose.Document { }

const OrderBookSchema = new mongoose.Schema({
  bids: { type: ObjectId, ref: 'SignedOrders' },
  asks: { type: ObjectId, ref: 'SignedOrders' },
});

export const OrderBook = mongoose.model<IOrderBookModel>('OrderBook', OrderBookSchema);
