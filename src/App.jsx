import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ItemPage from './pages/itemPage/ItemPage.jsx'
import ItemsPage from './pages/itemsPage/ItemsPage.jsx'
import OrdersPage from './pages/ordersPage/OrdersPage.jsx'
import CartPage from './pages/cartPage/CartPage.jsx'
import Navbar from './common/navbar/Navbar.jsx'
import Footer from './common/footer/Footer.jsx'
// hooks
import useCart from './hooks/useCart.jsx'
import useShopStatus from './hooks/useShopStatus.jsx'

// app notice
import LoadingIcon from './common/loadingIcon/LoadingIcon.jsx'
import sorryPNG from './images/sorry.png'
import cryPNG from './images/cry-144.png'

function App() {
  // shop status
  const { shopStatus, isLoading, fetchShopStatusError } = useShopStatus()

  // cart
  const { cartItemsId, addCartItem, removeCartItem, clearAllCartItems } =
    useCart()

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
  } else if (!isLoading && shopStatus?.isLock) {
    // 商店被鎖
    content = (
      <div className='app-notice'>
        {contentImage(cryPNG, 120)}
        <h2>{shopStatus.reason}</h2>
        <p>{shopStatus.message}</p>
        {IG}
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
      </>
    )
  }
  return content
}

export default App
