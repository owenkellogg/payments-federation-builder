import express from 'express'
import supertest from 'supertest'
import PaymentsFederation from '../../lib/payments_federation'
import assert from 'assert'

const EXAMPLE_LOOKUP_RESPONSE = {
  "result": "success",
  "federation_json": {
    "currencies": [
      {
        "currency": "BTC",
        "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
      }
    ],
    "domain": "btc2ripple.com",
    "type": "federation_record",
    "destination": "1AQxAq9mMbcBXn7L4XaNnwHZwXvuALewYB",
    "quote_url": "https://snapswap.us/api/v1/bridge"
  },
  "request": {
    "type": "federation",
    "destination": "1AQxAq9mMbcBXn7L4XaNnwHZwXvuALewYB",
    "domain": "btc2ripple.com"
  }
}

// GET https://snapswap.us/api/v1/bridge?type=quote&amount=1%2FBTC&destination=1AQxAq9mMbcBXn7L4XaNnwHZwXvuALewYB&address=rp4u5gEskM8DtBZvonZwbu6dspgVdeAGM6
const EXAMPLE_QUOTE_RESPONSE = {
  "result": "success",
  "status": "success",
  "quote": {
    "expires": 1433111620,
    "destination_tag": 1403334172,
    "amount": {
      "value": "1.00000000",
      "currency": "BTC"
    },
    "address": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
    "bitcoin_amount": "1.00000000",
    "destination_address": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q",
    "invoice_id": "F5544D02F1747CADDD32233A9BE7DE584B51107BBC3473F1316A7B9344C90E62",
    "send": [
      {
        "currency": "BTC",
        "value": "1.00000000",
        "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
      }
    ]
  },
  "request": {
    "type": "quote",
    "destination": "1AQxAq9mMbcBXn7L4XaNnwHZwXvuALewYB",
    "domain": "btc2ripple.com",
    "amount": "1.00000000/BTC"
  }
}

describe('Payments Federation API Server', () => {

  var federation

  before(() => {
    federation = new PaymentsFederation({
      rippleAddress: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk',
      domain: 'bitrip.io',
      quoteUrl: '/api/quotes',
      quoteRequired: true,
      lookupDestination: async () => {
        return true
      },
      getQuote: async (destination, currency, amount) => {
        return [{
          currency: currency,
          amount: amount * 1.001,
          tag: 123
        }]
      }
    })
  })

  it('should handle a name lookup', async done => {
    let handler = new federation.Handler()

    let response = await handler.lookup('stevenzeiler')
    assert.strictEqual(response.success, true)
    assert(response.federation_json.currencies.length > 0)
    done()
  })
    
  it('should get a quote for a payment', async done => {
    let handler = new federation.Handler()

    let quote = await handler.getQuote('stevenzeiler', 'BTC', 10)
    console.log('QUOTE', quote)
    done()
  })
})

