const { send } = require('micro')
const { get } = require('axios')
const cors = require('micro-cors')()

let data = {}

async function fetchPosts () {
  const res = await get('https://medium.com/@jackhanford/latest?format=json')
  const resData = await res.data
  data = await resData.replace('])}while(1);</x>', '')

  return data
}

fetchPosts()

setInterval(fetchPosts, 60 * 60 * 1000)

module.exports = cors((req, res) => send(res, 200, data))
