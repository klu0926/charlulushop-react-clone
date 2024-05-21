const isLocal = window.location.hostname === 'localhost';
const heroku = 'https://charlulu-shop-546c2a4689b9.herokuapp.com/api'
const local = 'http://localhost:3000/api'
const base = '/charlulushop-react'

const url = {
  server: isLocal ? local : heroku,
  client: base,
}
export default url