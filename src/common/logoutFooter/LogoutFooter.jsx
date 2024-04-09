import style from './logoutFooter.module.scss'
import sweetAlert from '../../helpers/sweetAlert'
import useShopStatus from '../../hooks/useShopStatus'
import LoadingIcon from '../../common/loadingIcon/LoadingIcon'

// 登出按鈕
async function handleLogout() {
  const result = await sweetAlert.confirm('登出', '確定要登出管理者？')
  if (result.isConfirmed) {
    localStorage.removeItem('charlulu-jwt')
    window.location.reload()
  }
}

export default function LogoutFooter() {
  const { shopStatus, isLoading, fetchShopStatusError } = useShopStatus()

  console.log('shopStatus:', shopStatus)

  let status = null
  if (isLoading) {
    status = <LoadingIcon size={20} />
  } else if (fetchShopStatusError) {
    status = <span style={{ color: `var(--primary)` }}>無法取得</span>
  } else if (shopStatus && shopStatus.isLock) {
    status = <span style={{ color: `var(--primary)` }}>關閉</span>
  } else if (shopStatus && !shopStatus.isLock) {
    status = <span style={{ color: `var(--secondary)` }}>開啟</span>
  }

  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div>
          商店狀態：
          {status}
        </div>
        <button className={style.button} onClick={handleLogout}>
          使用者登出
        </button>
      </div>
    </div>
  )
}
