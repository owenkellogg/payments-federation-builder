

export default class PaymentsFederation {

  constructor(options) {
    this.options = options
    class Handler {
      async lookup() {
        return {
          success: true,
          federation_json: {
            currencies: [
              {}
            ]
          }
        }
      }
  
      async getQuote(dest, currency, amount) {
        let quote = await options.getQuote(dest, currency, amount)
        return quote
      }
    }
    this.Handler = Handler
  }

  static extend(options) {
    return new this(options)
  }
}

