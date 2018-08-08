import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /orders', () => {

  it('should be json format', () => {
    return chai.request(app).get('/orders')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.type).to.be.json;
    });
  });
});

describe('GET /order:orderHash', () => {

  it('should be json format', () => {
    return chai.request(app).get('/order:orderHash')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.type).to.be.json;
    });
  });

  it('should contain all order components', () => {
    return chai.request(app).get('/orders')
    .then(res => {
      expect(res.body)
    });
  });
});

describe('GET /orderbook', () => {

  it('should be json format', () => {
    return chai.request(app).get('/orderbook')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.type).to.be.json;
    });
  });
})
      
