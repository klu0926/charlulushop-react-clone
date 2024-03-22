const isGitHubPages = window.location.hostname === 'klu0926.github.io';
const git = 'https://klu0926.github.io/charlulushop-react'
const local = '/charlulushop-react'

const url = {
  server: 'https://charlulu-shop-546c2a4689b9.herokuapp.com/api',
  client: isGitHubPages ? git : local
}
export default url