
export default class FederationRequest {

  constructor(name) {
    this.name = name
  }

  get tag() {
    return this._tag
  }

  get currencies() {
    return this._currencies
  }

  setTag(tag) {
    this._tag = tag
  }

  setCurrencies(currencies) {
    this._currencies = currencies
  }
}

