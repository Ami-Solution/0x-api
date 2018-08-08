import express = require('express');
var router = express.Router();

import { TokenController } from '../controllers/TokenController';
import { OrderController } from '../controllers/OrderController' ;
import { FeesController } from '../controllers/FeesController';

const tokenController = new TokenController();
const orderController = new OrderController();
const feesController = new FeesController();

// URLs for GET requests
router.get('/token_pairs', tokenController.getTokenPairs);
router.get('/orderbook', orderController.getOrderBook);
router.get('/orders', orderController.getMultipleOrders);
router.get('/order/:orderHash', orderController.getSingleOrder);

// URLS for POST requests
/*
router.post('/fees', feesController.getFees);
router.post('/order', orderController.submitOrder);
*/

module.exports = router;
