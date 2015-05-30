# Ripple Federation Service

REQUIRES babel-node (ES6)!

## Example Request Response

#### GET /federation?destination=1AQxAq9mMbcBXn7L4XaNnwHZwXvuALewYB&type=federation

````
{
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
````

