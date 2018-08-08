import { Document } from 'mongoose';

export interface IFees extends Document {
  feeRecipient?: string,
  makerFee?: string,
  takerFee?: string,
}
