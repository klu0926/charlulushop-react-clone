import url from '../data/url'
const authUrl = url.server + '/auth/jwt'

export default async function isAuthenticated() {
  try {
    const jwt = localStorage.getItem('charlulu-jwt')
    if (!jwt) return false

    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        JWT: jwt
      })
    })

    if (!response) throw new Error(response.statusText)
    const json = await response.json()
    if (!json.ok) throw new Error(json.err)

    return true
  } catch (err) {
    return false
  }
}