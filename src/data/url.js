const isGitHubPages = window.location.hostname === 'klu0926.github.io';
const heroku = 'https://charlulu-shop-546c2a4689b9.herokuapp.com/api'
const localServer = 'http://localhost:3000/api'
const base = '/charlulushop-react'

const url = {
  server: isGitHubPages ? heroku : localServer,
  client: base,
}
export default url