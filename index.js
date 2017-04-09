const { send } = require('micro')
const { get } = require('axios')
const cors = require('micro-cors')()

let data = {}

const fetchPosts = () => {
  return get('https://medium.com/@jackhanford/latest?format=json')
    .then(res => res.data)
    .then(body => {
      data = body.replace('])}while(1);</x>', '')
      console.log('got medium data')
    })
    .catch(err => {
      throw err
    })
}

fetchPosts()

setInterval(fetchPosts, 30 * 60 * 1000)

module.exports = cors((req, res) => send(res, 200, data))
