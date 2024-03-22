import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import './App.css'
import ItemPage from './pages/itemPage/ItemPage.jsx'
import ItemsPage from './pages/itemsPage/ItemsPage.jsx'
import OrdersPage from './pages/ordersPage/OrdersPage.jsx'
import CartPage from './pages/cartPage/CartPage.jsx'
import Navbar from './common/navbar/Navbar.jsx'
import Footer from './common/footer/Footer.jsx'
// hooks
import useCart from './hooks/useCart.jsx'
// url
import url from './data/url.js'

function App() {
  const { cartItemsId, addCartItem, removeCartItem, clearAllCartItems } =
    useCart()

  const itemsPageUrl = '/items'
  const itemPageUrl = '/items/:itemId'
  const ordersPageUrl = '/orders'
  const cartPageUrl =  '/cart'

  return (
    <>
      <Navbar cartItemsId={cartItemsId}></Navbar>
      <HashRouter>
        <div className='routers'>
          <Routes>
            <Route path='/' element={<Navigate to={itemPageUrl} />}></Route>
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

export default App
