import { Document } from 'mongoose';

export interface IOrderDocument extends Document {
  exchangeContractAddress?: string,
  maker?: string,
  taker?: string,
  makerTokenAddress?: string,
  takerTokenAddress?: string,
  feeRecipient?: string,
  makerTokenAmount?: string,
  takerTokenAmount?: string,
  makerFee?: string,
  takerFee?: string,
  expirationUnixTimestampSec?: string,
  salt: string,
  ecSignature: {
    v: string,
    r: string,
    s: string,
  }
}
