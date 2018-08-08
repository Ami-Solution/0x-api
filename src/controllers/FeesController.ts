import { Request, Response } from 'express';
import ZeroEx = require('0x.js');
import { Fees } from '../models/FeesModel';

export class FeesController {

  public getFees(req: Request, res: Response) {
    // parse request Object
    if (Object.keys(req.body).length === 0) {
      res.status(500).send('Request body is empty');
    }

    if (!req.is('json')) {
      res.status(500).send('Request is not in JSON format');
    }

    // Validate exchange exchangeContractAddress
    const validExchangeAddresses = [ '0x12459c951127e0c374ff9105dda097662a027093',
                                     '0x90fe2af704b34e0224bf2299c838e04d4dcf1364',
                                     '0x479cc461fecd078f766ecc58533d6f69580cf3ac',
                                     '0x1d16ef40fac01cec8adac2ac49427b9384192c05' ];

    const fees = new Fees(req.body);

    if (!validExchangeAddresses.includes(fees.exchangeContractAddress)) {
      res.status(500).send('Invalid contract address');
    }

    // Validate taker takerTokenAddress is empty
    const nullTakerAddress = '0x' + Array(41).join('0');

    if (nullTakerAddress !== fees.taker) {
      console.log(nullTakerAddress);
      console.log(fees.taker);
      res.status(500).send('Taker address must be null');
    }

    //Return fees
    res.json({feeRecipient: '0x',
              makerFee: 'maker',
              takerFee: 'taker',
            });
  }
}
