import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import ItemPage from './pages/itemPage/ItemPage.jsx'
import ItemsPage from './pages/itemsPage/ItemsPage.jsx'
import OrdersPage from './pages/ordersPage/OrdersPage.jsx'
import CartPage from './pages/cartPage/CartPage.jsx'
import Navbar from './common/navbar/Navbar.jsx'
import Footer from './common/footer/Footer.jsx'
import LogoutFooter from './common/logoutFooter/LogoutFooter.jsx'
// hooks
import useCart from './hooks/useCart.jsx'
import useShopStatus from './hooks/useShopStatus.jsx'

// app notice
import LoadingIcon from './common/loadingIcon/LoadingIcon.jsx'
import cryPNG from './images/cry-144.png'

// helper
import loginFrom from './helpers/loginFrom.js'
import isAuthenticated from './helpers/authenticate.js'
import sweetAlert from './helpers/sweetAlert.js'

// 登入按鈕
async function handleAdminClick() {
  loginFrom()
}

// ------------------------------------ //
function App() {
  // shop status
  const { shopStatus, isLoading, fetchShopStatusError } = useShopStatus()
  // isAuthenticated
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    async function handleAuthentication() {
      const isAuth = await isAuthenticated()
      if (isAuth) {
        setIsLogin(true)
      }
    }
    handleAuthentication()
  }, [])

  // cart
  const { cartItemsId, addCartItem, removeCartItem, clearAllCartItems } =
    useCart()

  // url
  const itemsPageUrl = '/items'
  const itemPageUrl = '/items/:itemId'
  const ordersPageUrl = '/orders'
  const cartPageUrl = '/cart'

  let content = null
  const IG = (
    <p>
      <a href='https://instagram.com/charlotte_journalday' target='_blank'>
        charlotte_journalday
      </a>
    </p>
  )
  const contentImage = (image, width) => (
    <img className='app-notice-img' src={image} style={{ width }} />
  )

  if (isLoading) {
    content = (
      <div className='app-notice'>
        <LoadingIcon />
      </div>
    )
  } else if (fetchShopStatusError) {
    content = (
      <div className='app-notice'>
        {contentImage(cryPNG, 120)}
        <h2>取得商店狀態失敗</h2>
        <p>請嘗試刷新頁面，如持續出錯煩請告知夏落特</p>
        {IG}
      </div>
    )
  } else if (!isLoading && shopStatus?.isLock && !isLogin) {
    // 商店被鎖
    content = (
      <div className='app-notice'>
        {contentImage(cryPNG, 120)}
        <h2>{shopStatus.reason}</h2>
        <p>{shopStatus.message}</p>
        {IG}
        <div style={{ marginTop: 10 }}>
          <button className='btn-border' onClick={handleAdminClick}>
            管理者登入
          </button>
        </div>
      </div>
    )
  } else {
    // 商店正常
    content = (
      <>
        <Navbar cartItemsId={cartItemsId}></Navbar>
        <HashRouter>
          <div className='routers'>
            <Routes>
              <Route path='/' element={<Navigate to={itemsPageUrl} />}></Route>
              <Route
                path={itemPageUrl}
                element={
                  <ItemPage
                    cartItemsId={cartItemsId}
                    addToCart={addCartItem}
                    removeCartItem={removeCartItem}
                  />
                }></Route>
              <Route
                path={itemsPageUrl}
                element={<ItemsPage cartItemsId={cartItemsId} />}></Route>
              <Route
                path={cartPageUrl}
                element={
                  <CartPage
                    cartItemsId={cartItemsId}
                    removeCartItem={removeCartItem}
                    clearAllCartItems={clearAllCartItems}
                  />
                }></Route>
              <Route path={ordersPageUrl} element={<OrdersPage />}></Route>
            </Routes>
          </div>
        </HashRouter>
        <Footer></Footer>
        {isLogin && <LogoutFooter />}
      </>
    )
  }
  return content
}

export default App
