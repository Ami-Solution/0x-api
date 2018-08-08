import { Request, Response } from 'express';
import { Order } from '../models/OrderModel';

export class OrderController {

  public getMultipleOrders(req: Request, res: Response) {
    // Return multiple orders according to parameters
    if (req.query === {}) {
      Order.find({})
           .exec().then((orders: any) => {
             res.status(200).json(orders);
           }).catch((err: Error) => {
             res.status(200).json(err);
           });
    }


    const validationErrors = this.validateQuery(req);
    if (validationErrors) {
      res.status(400).send(validationErrors);
    }

    const query = this.extractQuery(req);
    Order.find(query)
          .skip((query.per_page * query.page) - query.per_page)
          .limit(query.per_page)
          .exec().then((orders: any) => {
            res.status(200).json(orders);
          }).catch((err: Error) => {
            res.status(400).json(err);
          });
  }

  public getSingleOrder(req: Request, res: Response) {
    // Return single order according to order hash
    const validationErrors = this.validateQuery(req);
    if (validationErrors) {
      res.status(400).send(validationErrors);
    }

    const params = this.extractParams(req);
    Order.findOne(params)
          .exec().then((orders: any) => {
            res.status(200).json(orders);
          }).catch((err: Error) => {
            res.status(404).json(err);
          });
  }

  public getOrderBook(req: Request, res: Response) {
    // Returns orderbook for a given token pair
    const validationErrors = this.validateQuery(req);
    if (validationErrors) {
      res.status(400).send(validationErrors);
    }

    const query = this.extractQuery(req);
    Order.find(query)
          .skip((query.per_page * query.page) - query.per_page)
          .limit(query.per_page)
          .exec().then((orders: any) => {
            res.status(200).json(orders);
          }).catch((err: Error) => {
            res.status(404).json(err);
          });
  }

  private validateQuery(req: Request) {
    req.checkParams('orderHash', 'Order hash must be be alphanumberic and 66 characters')
      .optional().isAlphanumeric().isLength({min: 66, max: 66});
    req.checkQuery('exchangeContractAddress', 'Exchange contract address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('makerTokenAddress', 'Maker token address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('takerTokenAddress', 'Taker token address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('maker', 'Maker address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('taker', 'Taker address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('trader', 'Trader address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('feeRecipient', 'Fee recipient address must be alphanumeric and 42 characters')
      .optional().isAlphanumeric().isLength({min: 42, max: 42});
    req.checkQuery('per_page', 'Per page must be a number and between 1 and 100')
      .optional().isNumeric().isLength({min: 1, max: 100});
    req.checkQuery('page', 'Page must be a number').optional().isNumeric();

    return req.validationErrors();
  }

  private extractQuery(req: Request) {
    // Construct query object
    const query: any = {};
    for(let key in req.query) {
      req.query[key] !== "" ? query[key] = req.query[key] : null;
    }

    return query
  }

  private extractParams(req: Request) {
    // Construct params object
    const params: any = {};
    for(let key in req.params) {
      req.params[key] !== "" ? params[key] = req.params[key] : null;
    }

    return params
  }
}
