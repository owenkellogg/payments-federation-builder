import Federation from '../lib/federation_service'

class RandomFederation extends Federation {

  getTag() {
    let tag = Math.floor(Math.random() * 10000000)
    return Promise.resolve(tag)
  }
}

let federation = new RandomFederation('random.net', 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk')

federation.lookup('joseph123').then(response => {

  console.log("RESP", response)
})

