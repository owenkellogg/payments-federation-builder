
import FederationService from '../lib/federation_service'

let federation = new FederationService('stevenzeiler.com', 'rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q')

federation.lookup('me').then(user => {
  console.log(user)
})

