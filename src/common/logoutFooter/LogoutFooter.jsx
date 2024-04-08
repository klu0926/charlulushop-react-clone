
import style from './logoutFooter.module.scss'
import sweetAlert from "../../helpers/sweetAlert"


// 登出按鈕
async function handleLogout() {
  const result = await sweetAlert.confirm('登出', '確定要登出管理者？')
  if (result.isConfirmed) {
    localStorage.removeItem('charlulu-jwt')
    window.location.reload()
  }
}

export default function LogoutFooter() {
  return (
    <div className={style.footer}>
      <button className={style.button} onClick={handleLogout}>使用者登出</button>
    </div>
  )
}
