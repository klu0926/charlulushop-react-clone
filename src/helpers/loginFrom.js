import sweetAlert from "./sweetAlert"
import url from '../data/url'
const loginUrl = url.server + '/auth'

export default async function loginFrom() {
  try {
    const loginResult = await sweetAlert.loginForm()
    if (!loginResult.isConfirmed) return
    // fetch
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: loginResult.value.name,
        password: loginResult.value.password,
      }),
    })
    if (!response) throw new Error(response.statusText)
    const json = await response.json()
    if (!json.ok) throw new Error(json.err)

    // save jwt to local storage
    const jwt = json.data.jwt
    if (!jwt) throw new Error('取得Token失敗')
    localStorage.setItem('charlulu-jwt', jwt)
    await sweetAlert.success('登入成功', '成功取得認證Token')

    // 跳轉頁面？
    // 或是再次認證？
    window.location.reload()

  } catch (err) {
    await sweetAlert.error('登入失敗', err.message || err)
  }
}

