import FederationRequest from './federation_request'

export default class FederationService {

  constructor(domain, address) {
    this.domain = domain 
    this.address = address
  }

  getTag() {
    return Promise.resolve(89343034)
  }

  getCurrencies() {
    console.log('getCurrencies')
    return Promise.resolve([
      {
        "currency": "USD",
        "issuer": "rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q"
      }
    ])
  }

  lookup(name) {

    this.request = new FederationRequest(name)

    return this.getTag()
      .then(tag => {
        this.request.setTag(tag)
        return this.getCurrencies()
      })
      .then((currencies) => {
        this.request.setCurrencies(currencies)
        return {
          "result": "success",
          "federation_json": {
            "destination": name,
            "destination_tag": this.request.tag,
            "dt": this.request.tag,
            "currencies": this.request.currencies,
            "domain": this.domain,
            "type": "federation_record",
            "destination_address": this.address
          },
          "request": {
            "type": "federation",
            "destination": name,
            "domain": this.domain
          }
        }
      })
  }
}

